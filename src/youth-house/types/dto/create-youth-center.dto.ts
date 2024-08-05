import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { isArray } from 'lodash';

export class CreateYouthCenterDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  governorate: string;
  
  @ApiPropertyOptional()
  @IsUUID('all', { each: true })
  @IsArray()
  services: string[];

}
