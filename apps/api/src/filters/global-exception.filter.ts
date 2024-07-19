import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WS_SERVER_EVENTS } from 'src/config/keys/ws-events';

@Catch(WsException, HttpException)
export class GlobalExceptionFilter
  extends BaseWsExceptionFilter
  implements ExceptionFilter
{
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    if (exception instanceof WsException) {
      const client = host.switchToWs().getClient<Socket>();

      const message = exception.message || 'Internal server error';
      const errorMessages = Array.isArray(message) ? message : [message];

      const errorResponce = {
        message: errorMessages,
      };

      return client.emit(WS_SERVER_EVENTS.SERVER_EXCEPTION, errorResponce);
    }

    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status = exception.getStatus() || 500;
      const message = exception.message || 'Internal server error';
      const errorMessages = Array.isArray(message) ? message : [message];

      const errorResponse = {
        statusCode: status,
        messages: errorMessages,
      };
      return response.status(errorResponse.statusCode).json(errorResponse);
    }
  }
}
