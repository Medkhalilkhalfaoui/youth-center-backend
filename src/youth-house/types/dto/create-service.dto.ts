import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  // @ApiPropertyOptional()
  // @IsUUID()
  // @IsOptional()
  // @IsNotEmpty()
  // youthCenter?: string;
}
