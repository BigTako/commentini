import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthProvider } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ILocalLoginDto, ILocalSignUpDto } from './types';
import { ICreateUserDto, IUser } from 'src/users/user';

export interface IGoogleProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private singToken(user: IUser) {
    const { id, email } = user;
    const payload = { email, id };

    const token = this.jwtService.sign(payload);
    return token;
  }

  async localSignup({ password, ...info }: ILocalSignUpDto) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      ...info,
      password: hashedPassword,
      authProvider: AuthProvider.LOCAL,
    });

    const token = this.singToken(user);
    return {
      token,
    };
  }

  async localLogin({ email, password }: ILocalLoginDto) {
    const user = await this.usersService.findOneLocalAuthed(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const userPassword = user.password as string;

    const isPasswordCorrect = await bcrypt.compare(password, userPassword);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const token = this.singToken(user);
    return {
      token,
    };
  }

  async googleLogin(req: { user: IGoogleProfile }) {
    const reqUser = req.user;

    if (!reqUser) {
      throw new UnauthorizedException(
        'Cant extract profile from Google account',
      );
    }

    const userBody: ICreateUserDto = {
      email: reqUser.email,
      username: `${reqUser.firstName} ${reqUser.lastName}`,
      authProvider: AuthProvider.GOOGLE,
      password: null,
    };

    const user = await this.usersService.findByEmailOrCreate({
      email: reqUser.email,
      data: userBody,
    });

    if (user.authProvider !== AuthProvider.GOOGLE) {
      throw new BadRequestException('Account with this email already exists');
    }

    const token = this.singToken(user);
    return {
      token,
    };
  }
}
