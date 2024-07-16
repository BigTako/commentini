import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ERequest } from 'express';
import { ICreateUserDto, IUser } from 'src/users/user';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: ERequest & { user: IUser }) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() body: ICreateUserDto) {
    const user = await this.authService.signup(body);
    return user;
  }
}
