import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ERROR_MESSAGE } from './errorMessage';

export enum PrismaError {
  ForeignKeyConstraintFailed = 'P2003',
  RecordDoesNotExist = 'P2025',
}

export const HttpPrismaError = {
  [PrismaError.ForeignKeyConstraintFailed]: {
    type: InternalServerErrorException,
  },
  [PrismaError.RecordDoesNotExist]: {
    type: BadRequestException,
    message: ERROR_MESSAGE.NOT_EXIST,
  },
};
