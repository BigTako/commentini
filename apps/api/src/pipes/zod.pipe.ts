import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(
    private readonly schema: ZodSchema,
    private readonly exceptionType: 'ws' | 'http',
  ) {}

  transform(value: object) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (this.exceptionType === 'ws') {
        throw new WsException(error);
      }
      if (this.exceptionType === 'http') {
        throw new HttpException(error, 400);
      }
    }
    return value;
  }
}
