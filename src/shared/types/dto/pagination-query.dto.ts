import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { SortOrder } from '../enums';

export class PaginationQuery {
  @ApiPropertyOptional({ minimum: 1, type: Number, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;

  @ApiPropertyOptional({ minimum: 1, type: Number, default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  pageSize?: number;

  // @ApiPropertyOptional({
  //   enum: SortOrder,
  //   type: SortOrder,
  //   default: SortOrder.DESC,
  // })
  // @IsEnum(SortOrder)
  // @IsOptional()
  // order?: SortOrder;
}
