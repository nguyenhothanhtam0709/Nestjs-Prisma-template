import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFoodDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  Description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  Price: number;
}
