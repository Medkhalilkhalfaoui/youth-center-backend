import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnityDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
}
