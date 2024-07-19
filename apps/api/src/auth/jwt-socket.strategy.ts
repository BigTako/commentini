import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Socket } from 'socket.io';
import { jwtConstants } from './constants';
import { IJwtPayload } from './types';

@Injectable()
export class JwtSocketStrategy extends PassportStrategy(
  Strategy,
  'jwt-socket',
) {
  constructor() {
    super({
      jwtFromRequest: JwtSocketStrategy.extractJWT,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  private static extractJWT(socket: Socket): string | null {
    if (socket.data.token) {
      return socket.data.token;
    }
    return null;
  }

  async validate(payload: IJwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}
