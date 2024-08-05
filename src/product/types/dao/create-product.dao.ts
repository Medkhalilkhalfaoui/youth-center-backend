import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDao {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code_article: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  code_a_barre?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  marque?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  family?: string;

  @IsUUID()
  @IsNotEmpty()
  unity: string;

  @IsUUID()
  @IsNotEmpty()
  provider: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  file?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  parentProduct?: string;
}
