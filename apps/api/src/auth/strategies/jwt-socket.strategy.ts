import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Socket } from 'socket.io';
import { IJwtPayload } from '../types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtSocketStrategy extends PassportStrategy(
  Strategy,
  'jwt-socket',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: JwtSocketStrategy.extractJWT,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  private static extractJWT(socket: Socket): string | null {
    if (socket.data.token) {
      return socket.data.token;
    }
    return null;
  }

  async validate(payload: IJwtPayload) {
    return { id: payload.id, email: payload.email };
  }
}
