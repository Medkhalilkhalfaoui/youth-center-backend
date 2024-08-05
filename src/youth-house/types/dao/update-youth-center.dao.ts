import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateYouthCenterDao {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  address?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  governorate?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;
}
