import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || 500;
    const error = exception.getResponse() as { message: string | string[] };
    const message = error.message || 'Internal server error';
    const errorMessages = Array.isArray(message) ? message : [message];
    const errorResponse = {
      statusCode: status,
      messages: errorMessages,
    };

    return response.status(errorResponse.statusCode).json(errorResponse);
  }
}
