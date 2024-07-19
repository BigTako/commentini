import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ERequest } from 'express';
import { ICreateUserDto, IUser } from 'src/users/user';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { formatError } from 'src/utils/formatError';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ERequest & { user: IUser }) {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw new BadRequestException(formatError(error));
    }
  }

  @Post('signup')
  async signup(@Body() body: ICreateUserDto) {
    try {
      const user = await this.authService.signup(body);
      return user;
    } catch (error) {
      throw new BadRequestException(formatError(error));
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ERequest & { user: IUser }) {
    try {
      return req.user;
    } catch (error) {
      throw new BadRequestException(formatError(error));
    }
  }
}
