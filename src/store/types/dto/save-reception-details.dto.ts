import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { IProduct } from 'src/product/types/interfaces';
import { SaveHangarReceptionDetailsDto } from './save-hangar-reception-details.dto';
import { IYouthCenter } from 'src/youth-house/types/interfaces';

export class SaveReceptionDetailsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsNotEmpty()
  product: IProduct | string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  youthCenter?: IYouthCenter | string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  //@ArrayMinSize(1)
  @ValidateNested()
  @Type(() => SaveHangarReceptionDetailsDto)
  hangarReceptionDetails?: SaveHangarReceptionDetailsDto[];
}
