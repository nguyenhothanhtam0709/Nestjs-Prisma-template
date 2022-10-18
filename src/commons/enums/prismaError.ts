import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGE } from './errorMessage';

export enum PrismaError {
  RecordDoesNotExist = 'P2025',
}

export const HttpPrismaError = {
  [PrismaError.RecordDoesNotExist]: {
    type: BadRequestException,
    message: ERROR_MESSAGE.NOT_EXIST,
  },
};
