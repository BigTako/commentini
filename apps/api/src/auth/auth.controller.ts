import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ERequest } from 'express';
import { ICreateUserDto, IUser } from 'src/users/user';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: ERequest & { user: IUser }) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() body: ICreateUserDto) {
    const user = await this.authService.signup(body);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ERequest & { user: IUser }) {
    return req.user;
  }
}
