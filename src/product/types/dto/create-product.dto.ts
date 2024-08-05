import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreateProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  code_article: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  code_a_barre?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  marque?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  family?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsNotEmpty()
  unity: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsNotEmpty()
  provider: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  parentProduct?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  file?: string;


  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateProductDto)
  childrenProducts?: CreateProductDto[];
}
