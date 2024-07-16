import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ICreateUserDto } from 'src/users/user';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      // const { password: _, ...result } = user;
      return user;
    }
    return null;
  }

  async signup(data: ICreateUserDto) {
    const user = await this.usersService.create(data);
    return user;
  }
}
