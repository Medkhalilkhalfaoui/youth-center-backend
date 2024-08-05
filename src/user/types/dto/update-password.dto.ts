import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  oldPassword?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  newPassword?: string;
}
