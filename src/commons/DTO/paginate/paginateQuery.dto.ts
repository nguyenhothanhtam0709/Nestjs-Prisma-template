import {
  MAX_PAGE_SIZE,
  MIN_PAGE_INDEX,
  MIN_PAGE_SIZE,
} from '@commons/const/paginate';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginateQueryDto {
  @ApiProperty({
    required: false,
    type: Number,
    minimum: MIN_PAGE_SIZE,
    maximum: MAX_PAGE_SIZE,
    description: `Min: ${MIN_PAGE_SIZE}, Max: ${MAX_PAGE_SIZE}`,
  })
  @IsOptional()
  @IsNumber()
  @Min(MIN_PAGE_SIZE)
  @Max(MAX_PAGE_SIZE)
  pageSize?: number;

  @ApiProperty({
    required: false,
    type: Number,
    minimum: MIN_PAGE_INDEX,
    description: `Min: ${MIN_PAGE_INDEX}`,
  })
  @IsOptional()
  @IsNumber()
  @Min(MIN_PAGE_INDEX)
  pageIndex?: number;
}
