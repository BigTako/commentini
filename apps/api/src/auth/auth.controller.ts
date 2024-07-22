import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request as ERequest } from 'express';
import { IUser } from 'src/users/user';
import { AuthService } from './auth.service';
import { formatError } from 'src/utils/formatError';
import { ZodPipe } from 'src/pipes/zod.pipe';
import {
  loginSchema,
  signUpSchema as signupSchema,
} from 'src/lib/validation-schemas/auth';
import { ILocalLoginDto, ILocalSignUpDto } from './types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserResponceDto } from './dto/user-responce.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req: any) {
    return this.authService.googleLogin(req);
  }

  @Post('signup')
  async signup(@Body(new ZodPipe(signupSchema, 'http')) body: ILocalSignUpDto) {
    try {
      const user = await this.authService.localSignup(body);
      return user;
    } catch (error) {
      throw new BadRequestException(formatError(error));
    }
  }

  @Post('login')
  async login(@Body(new ZodPipe(loginSchema, 'http')) body: ILocalLoginDto) {
    try {
      return this.authService.localLogin(body);
    } catch (error) {
      throw new BadRequestException(formatError(error));
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new SerializeInterceptor<UserResponceDto>(UserResponceDto))
  @Get('profile')
  getProfile(@Request() req: ERequest & { user: IUser }) {
    try {
      return req.user;
    } catch (error) {
      throw new BadRequestException(formatError(error));
    }
  }
}
