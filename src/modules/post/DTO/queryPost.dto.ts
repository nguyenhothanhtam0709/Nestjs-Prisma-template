import { MIN_SEARCH_CHAR_LEN } from '@commons/const/query';
import { PaginateQueryDto } from '@commons/DTO/paginate';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class QueryPostDto extends PaginateQueryDto {
  @ApiProperty({ required: false, minLength: MIN_SEARCH_CHAR_LEN })
  @IsOptional()
  @MinLength(MIN_SEARCH_CHAR_LEN)
  title?: string;
}
