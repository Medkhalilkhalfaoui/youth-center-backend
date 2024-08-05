import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationQuery } from 'src/shared/types';
import { SortOrder } from 'src/shared/types/enums';

export class GetStatusQueryDto extends PaginationQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value.toLowerCase() === 'true')
  active?: boolean;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  provider?: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  keyword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code_article?: string;


  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    enum: SortOrder,
    type: SortOrder,
    default: SortOrder.DESC,
  })
  @IsEnum(SortOrder)
  @IsOptional()
  orderKey?: SortOrder;
}
