import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationQuery } from "src/shared/types";
import { SortOrder } from "src/shared/types/enums";

export class GetCategoriesQueryDto extends PaginationQuery {
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value.toLowerCase() === 'true')
    active?: boolean;
    
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
}