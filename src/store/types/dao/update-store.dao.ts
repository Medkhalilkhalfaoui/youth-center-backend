import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStoreDao {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;
}
