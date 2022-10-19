import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumberString, Min, MinLength } from 'class-validator';

export class InitMultipartUploadDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(5)
  key: string;
}

export class GetMultipartSignedUrlDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  partNumber: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  fileKey: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  fileId: string;
}

export class GetMultipartUploadSignedUrlDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  parts: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  fileKey: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  fileId: string;
}
