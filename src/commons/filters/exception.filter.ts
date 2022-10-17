import { ErrorResponseDto } from '@commons/DTO/response';
import { exceptionSerialize } from '@commons/utils/error';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const error = exceptionSerialize(exception);

    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();
      const status = error.getStatus();

      res.status(status).json(new ErrorResponseDto(status, error.message));
    }
  }
}
