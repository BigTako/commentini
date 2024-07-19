import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class JwtSocketGuard extends AuthGuard('jwt-socket') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token =
      client.handshake.auth?.token || client.handshake.headers?.token;

    if (!token) {
      throw new WsException('Unauthorized');
    }

    const authtoken: string = Array.isArray(token) ? token[0] : token;

    client.data.token = authtoken; // Set the token on the Socket object

    return super.canActivate(context);
  }

  handleRequest<IUser>(err: Error, user: IUser): IUser {
    if (err || !user) {
      throw new WsException('Unauthorized'); // Customize your error message or type here
    }
    return user;
  }
}
