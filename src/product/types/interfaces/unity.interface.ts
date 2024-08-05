import { IIdentifiable } from 'src/shared/types';
import { IProduct } from './product.interface';

export interface IUnity extends IIdentifiable {
  name: string;
  isActive: boolean;
  products: IProduct[] | string[];
}
