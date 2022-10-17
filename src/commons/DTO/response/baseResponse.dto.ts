import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiResponseProperty({ type: Number, example: 1 })
  statusCode: number;

  @ApiResponseProperty({ type: Boolean })
  success: boolean;

  constructor(statusCode: number, success: boolean) {
    this.statusCode = statusCode;
    this.success = success;
  }
}
