import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDao {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;
}
