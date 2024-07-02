import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { ZodError } from 'zod';
import { Socket } from 'socket.io';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { WS_SERVER_EVENTS } from 'src/config/keys/ws-events';

interface ErrorResponse {
  statusCode: number;
  messages: string[];
}

function formatPrismaError({
  data,
  status,
}: {
  data: PrismaClientKnownRequestError;
  status: number;
}): ErrorResponse {
  let errorResponse: ErrorResponse;
  const { meta, code } = data;

  const errorMeta = meta as Record<string, string[]>;

  if (code === 'P2002') {
    const modelName = errorMeta?.modelName ?? 'Instance';
    const field = errorMeta?.target[0] ?? 'field';
    errorResponse = {
      statusCode: status || 500,
      messages: [`Error: ${modelName} with this ${field} already exists`],
    };
  } else {
    errorResponse = {
      statusCode: status || 500,
      messages: [`Database error`],
    };
  }
  return errorResponse;
}

function formatZodError({
  data,
  status,
}: {
  data: ZodError;
  status: number;
}): ErrorResponse {
  const errors = data.errors.map((e) => e.message);
  return {
    statusCode: status || 400,
    messages: errors,
  };
}

function formatInternalServerError({
  data,
  status,
}: {
  data: Error;
  status: number;
}) {
  const message = data.message || 'Internal server error';
  const errorMessage = Array.isArray(message) ? message : [message];
  return {
    statusCode: status || 500,
    messages: errorMessage,
  };
}

function formatException({
  exception,
  status,
}: {
  exception: string | object;
  status: number;
}) {
  if (typeof exception === 'object') {
    if (exception instanceof ZodError) {
      return formatZodError({ data: exception, status });
    }
    if (exception instanceof PrismaClientKnownRequestError) {
      return formatPrismaError({ data: exception, status });
    }
    if (exception instanceof Error) {
      return formatInternalServerError({ data: exception, status });
    }
  }

  return {
    statusCode: status || 500,
    messages: [exception || 'Internal server error'],
  };
}

@Catch(WsException, HttpException)
export class GlobalExceptionFilter
  extends BaseWsExceptionFilter
  implements ExceptionFilter
{
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    if (exception instanceof WsException) {
      const client = host.switchToWs().getClient<Socket>();
      const error = exception.getError();

      let status = 500;

      if (typeof error === 'object' && 'status' in error) {
        status = error.status as number;
      }

      console.log(exception);

      const errorResponse = formatException({ exception: error, status });

      return client.emit(WS_SERVER_EVENTS.SERVER_EXCEPTION, errorResponse);
    }

    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status = exception.getStatus();

      console.log(exception);

      const errorResponse = formatException({ exception, status });

      return response.status(errorResponse.statusCode).json(errorResponse);
    }
  }
}
