import { IProduct } from 'src/product/types/interfaces';
import { IIdentifiable } from 'src/shared/types';
import { IPurchase } from './purchase.interface';

export interface IPurchaseDetails extends IIdentifiable {
  quantity: number;
  product: IProduct| string;
  purchase: IPurchase | string;
  quantity_received: number;
}
