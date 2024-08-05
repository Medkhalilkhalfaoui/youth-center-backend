import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested} from 'class-validator';
import { CreateHangarDto } from './create-hangar.dto';

export class CreateStoreDto {
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
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateHangarDto)
  hangars: CreateHangarDto[];
}
