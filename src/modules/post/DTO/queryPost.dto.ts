import { PaginateQueryDto } from '@commons/DTO/paginate';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class QueryPostDto extends PaginateQueryDto {
  @ApiProperty({ required: false, minLength: 3 })
  @IsOptional()
  @MinLength(3)
  title?: string;
}
