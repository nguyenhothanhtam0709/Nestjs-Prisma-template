import { MIN_SEARCH_CHAR_LEN } from '@commons/const/query';
import { PaginateQueryDto } from '@commons/DTO/paginate';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class QueryCategoryDto extends PaginateQueryDto {
  @ApiProperty({
    required: false,
    type: String,
    minLength: MIN_SEARCH_CHAR_LEN,
  })
  @IsOptional()
  @MinLength(MIN_SEARCH_CHAR_LEN)
  name?: string;
}
