import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';

function formatPrismaError(data: PrismaClientKnownRequestError): string {
  const { meta, code } = data;

  const errorMeta = meta as Record<string, string[]>;

  if (code === 'P2002') {
    const modelName = errorMeta?.modelName ?? 'Instance';
    const field = errorMeta?.target[0] ?? 'field';
    return `Error: ${modelName} with this ${field} already exists`;
  }
  if (code === 'P2000') {
    const modelName = errorMeta?.modelName ?? 'Instance';
    const field = errorMeta?.column_name ?? 'field';
    return `Error: Value of field ${field} is too long for defined in ${modelName} model`;
  }
  console.log(data);
  return `Database error`;
}

function formatZodError(data: ZodError): string[] {
  const errors = data.errors.map((e) => e.message);
  return errors;
}

export function formatError(error: Error): string | string[] {
  if (error instanceof PrismaClientKnownRequestError) {
    return formatPrismaError(error);
  } else if (error instanceof ZodError) {
    return formatZodError(error);
  }
  return 'Internal server error';
}
