import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { SaveReceptionDetailsDto } from './save-reception-details.dto';

export class CreateReceptionDto {
  // @ApiPropertyOptional()
  // @IsUUID()
  // @IsNotEmpty()
  // hangar: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsNotEmpty()
  purchase: string;

  @ApiPropertyOptional()
  @IsString()
  Truck_license_plate: string;

  @ApiPropertyOptional()
  @IsString()   
  driver: string;

  @ApiPropertyOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => SaveReceptionDetailsDto)
  reception_details: SaveReceptionDetailsDto[];






}
