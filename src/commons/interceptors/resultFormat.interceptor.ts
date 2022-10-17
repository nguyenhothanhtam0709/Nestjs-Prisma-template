import { SuccessResponseDto } from '@commons/DTO/response';
import { exceptionSerialize } from '@commons/utils/error';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class ResultFormatInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => this.successResultFormat(context, data)),
      catchError((error) => this.exceptionResultFormat(context, error)),
    );
  }

  private async successResultFormat(context: ExecutionContext, data: any) {
    const res = context.getArgByIndex(1);
    const statusCode = res.statusCode || HttpStatus.OK;

    return new SuccessResponseDto(statusCode, data);
  }

  private async exceptionResultFormat(context: ExecutionContext, error: any) {
    if (!(error instanceof HttpException)) {
      throw exceptionSerialize(error);
    }

    throw error;
  }
}
