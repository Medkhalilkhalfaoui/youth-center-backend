import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  code_a_barre?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  marque?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  family?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  unity?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  provider?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  file?: string;
}
