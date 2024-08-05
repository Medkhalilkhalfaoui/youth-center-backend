import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../enums';

export class UpdateStatusPurchaseDao {
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
