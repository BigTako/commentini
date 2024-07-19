import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';

@Injectable()
export class CheckBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const wsContext = context.switchToWs();
    const data = wsContext.getData();
    const forbiddenSymbols = ['$', '%', '#', '{', '}'];

    for (const key of Object.keys(data)) {
      const value = data[key];
      if (
        typeof value === 'string' &&
        forbiddenSymbols.some((symbol) => value.includes(symbol))
      ) {
        throw new WsException({
          message: `${key} data contains forbidden symbols.`,
        });
      }
    }
    return next.handle();
  }
}
