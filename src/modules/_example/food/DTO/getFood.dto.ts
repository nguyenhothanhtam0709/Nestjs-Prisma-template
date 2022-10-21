import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetFoodDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  Region: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  Name: string;
}
