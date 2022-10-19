import { HttpPrismaError } from '@commons/enums/prismaError';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const exceptionSerialize = (exception: any) => {
  if (!(exception instanceof HttpException)) {
    const message = exception?.message || exception?.error;
    return new InternalServerErrorException(message);
  }

  return exception;
};

export const mapPrismaError = (
  error: any,
  name: string,
): HttpException | Error => {
  if (!(error instanceof PrismaClientKnownRequestError)) {
    return error;
  }

  const errorResolver = HttpPrismaError[error.code];
  if (errorResolver) {
    const { type, message } = errorResolver;
    return new type(message?.replace('{0}', name) || error?.message);
  }

  return error;
};
