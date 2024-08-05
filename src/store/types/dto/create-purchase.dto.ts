import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SavePurchaseDetailsDto } from './save-purchase-details.dto';

export class CreatePurchaseDto {

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  provider_name: string;
  
  @ApiPropertyOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => SavePurchaseDetailsDto)
  purchase_details: SavePurchaseDetailsDto[];
}
