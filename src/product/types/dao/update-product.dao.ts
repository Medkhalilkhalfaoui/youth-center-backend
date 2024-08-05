import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateProductDao {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  code_a_barre?: string;

  @IsString()
  @IsOptional()
  marque?: string;

  @IsString()
  @IsOptional()
  family?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @IsUUID()
  @IsOptional()
  unity?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  provider?: string;


  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  file?: string;
}
