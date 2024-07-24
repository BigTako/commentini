import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WS_SERVER_EVENTS } from 'src/config/keys/ws-events';

@Catch(WsException)
export class WsExceptionFilter
  extends BaseWsExceptionFilter
  implements ExceptionFilter
{
  catch(exception: WsException, host: ArgumentsHost) {
    console.log(exception);

    const client = host.switchToWs().getClient<Socket>();
    const error = exception.getError() as { message: string[] | string };
    const message = error.message || 'Internal server error';
    const errorMessages = Array.isArray(message) ? message : [message];
    const errorResponse = {
      messages: errorMessages,
    };

    return client.emit(WS_SERVER_EVENTS.SERVER_EXCEPTION, errorResponse);
  }
}
