import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const customExceptionFactory = (errors: ValidationError[]) => {
  const message = exceptionTransform(errors);
  throw new BadRequestException(message);
};

const exceptionTransform = (errors: ValidationError[]) => {
  const message = errors.map((error) => exceptionFlattening(error)).join(';  ');
  return message;
};

const exceptionFlattening = (error: ValidationError): string => {
  let childrenMsg = '';
  if (error?.children?.length) {
    childrenMsg = error.children
      .map((i) => exceptionFlattening(i))
      .filter((i) => i)
      .join(',');
  }

  const constraints = error.constraints
    ? Object.values(error.constraints).join(', ')
    : '';

  const message = `${error.property}: ${[constraints, childrenMsg]
    .filter((i) => i)
    .join(',')}`;
  return message;
};
