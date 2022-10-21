import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryFoodDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  Region?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  Name?: string;
}
