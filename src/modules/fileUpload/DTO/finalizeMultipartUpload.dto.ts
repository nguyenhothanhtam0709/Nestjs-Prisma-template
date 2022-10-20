import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class PartDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  PartNumber: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  ETag: string;
}

export class FinalizeMultipartUploadDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  fileKey: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  fileId: string;

  @ApiProperty({ required: true, type: PartDto, isArray: true })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  parts: Array<PartDto>;
}
