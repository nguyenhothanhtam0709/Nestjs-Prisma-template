import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateCategoryDto } from './createCategory.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  id: number;
}
