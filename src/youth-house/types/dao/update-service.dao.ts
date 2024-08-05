import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateServiceDao {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;
}
