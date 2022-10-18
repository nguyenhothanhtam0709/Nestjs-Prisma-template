import { MEDIA_TYPE_ENUMS } from '@commons/enums/media';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';

export class UpdateMediaDto {
  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ required: true, example: 'abc.com/xyz' })
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

export class UpdatePostDto {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: true, type: UpdateMediaDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateMediaDto)
  medias?: Array<UpdateMediaDto>;

  @ApiProperty({ required: false, type: Number, isArray: true })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @ArrayMinSize(1)
  categories: number[];
}
