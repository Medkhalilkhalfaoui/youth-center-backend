import { IIdentifiable } from 'src/shared/types';
import { IReception } from './reception.interface';
import { IProduct } from 'src/product/types/interfaces';
import { IYouthCenter } from 'src/youth-house/types/interfaces';

export interface IReceptionDetails extends IIdentifiable {
  quantity: Number;
  product: IProduct| string;
  reception: IReception | string;
  youthCenter: IYouthCenter | string;
}
