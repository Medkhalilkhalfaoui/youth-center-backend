import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationQuery } from 'src/shared/types';
import { SortOrder } from 'src/shared/types/enums';
import { Status } from '../enums';
import { isArray } from 'lodash';

export class GetQueryDto extends PaginationQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  keyword?: string;

  @ApiPropertyOptional({
    enum: SortOrder,
    type: SortOrder,
    default: SortOrder.DESC,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  orderKey?: SortOrder;

  //   @ApiPropertyOptional()
  //   @IsEnum(Status)
  //   @IsOptional()
  //   status?: Status;

  @ApiPropertyOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Transform(({ value }) => (isArray(value) ? value : value.split(',')))
  status: string[];
}
