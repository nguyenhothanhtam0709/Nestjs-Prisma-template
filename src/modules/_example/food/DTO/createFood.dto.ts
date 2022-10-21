import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFoodDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  Region: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  Name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  Description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  Price: number;
}
