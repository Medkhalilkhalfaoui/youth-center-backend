import { IIdentifiable } from 'src/shared/types';
import { IProduct } from './product.interface';

export interface IProvider extends IIdentifiable {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  governorate: string;
  isActive: boolean;
  products: IProduct[] | string[];
}
