import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../enums';

export class UpdateStatusPurchaseDto {
  @ApiPropertyOptional()
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
