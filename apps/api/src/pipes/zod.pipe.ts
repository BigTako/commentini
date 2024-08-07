import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { formatError } from 'src/utils/formatError';
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
      const message = formatError(error);
      if (this.exceptionType === 'ws') {
        throw new WsException({ message });
      }
      if (this.exceptionType === 'http') {
        throw new BadRequestException({ message });
      }
    }
    return value;
  }
}
