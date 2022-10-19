import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class GetUploadFilePresignedUrl {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(5)
  key: string;
}
