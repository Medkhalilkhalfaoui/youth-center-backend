import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { IHangar, IReceptionDetails } from '../interfaces';

export class SaveHangarReceptionDetailsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsNotEmpty()
  hangar: IHangar | string;

//   @ApiPropertyOptional()
//   @IsUUID()
//   @IsNotEmpty()
//   receptionDetails: IReceptionDetails | string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
