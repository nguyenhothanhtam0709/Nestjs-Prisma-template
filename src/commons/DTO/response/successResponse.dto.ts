import { BaseResponseDto } from './baseResponse.dto';

export class SuccessResponseDto<T> extends BaseResponseDto {
  data?: T;

  constructor(statusCode: number, data?: T) {
    super(statusCode, true);
    this.data = data;
  }
}
