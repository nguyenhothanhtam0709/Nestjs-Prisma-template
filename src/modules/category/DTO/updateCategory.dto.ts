import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCategoryDto } from './createCategory.dto';

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
