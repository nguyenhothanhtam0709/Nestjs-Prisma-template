import { MEDIA_TYPE_ENUMS } from '@commons/enums/media';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({
    required: true,
    type: Number,
    default: MEDIA_TYPE_ENUMS.IMAGE,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsEnum(MEDIA_TYPE_ENUMS)
  type: number;
}

export class CreatePostDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: true, type: CreateMediaDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateMediaDto)
  medias: Array<CreateMediaDto>;
}
