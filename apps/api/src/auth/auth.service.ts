import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ICreateUserDto, IUser } from 'src/users/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      // const { password: _, ...result } = user;
      return user;
    }
    return null;
  }

  async signup(data: ICreateUserDto) {
    const user = await this.usersService.create(data);
    return user;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
