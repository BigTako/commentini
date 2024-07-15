import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsExceptionInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof WsException) {
          throw error;
        }
        throw new WsException(error);
      }),
    );
  }
}
