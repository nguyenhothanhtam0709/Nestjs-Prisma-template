import { BaseResponseDto } from './baseResponse.dto';

export class ErrorResponseDto extends BaseResponseDto {
  message?: string;

  constructor(statusCode: number, message?: string) {
    super(statusCode, false);
    this.message = message;
  }
}
