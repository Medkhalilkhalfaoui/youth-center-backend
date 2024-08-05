import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { IProduct } from 'src/product/types/interfaces';

export class SavePurchaseDetailsDto {
 
  @IsUUID()
  @IsNotEmpty()
  product: IProduct | string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
