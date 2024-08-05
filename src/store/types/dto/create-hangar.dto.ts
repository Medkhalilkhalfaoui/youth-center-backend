import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateHangarDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

 
  
  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  surface: number;
}
