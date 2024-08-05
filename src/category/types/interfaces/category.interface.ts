import { IProduct } from 'src/product/types/interfaces';
import { IIdentifiable } from 'src/shared/types';

export interface ICategory extends IIdentifiable {
  name: string;
  description: string;
  isActive: boolean;
  products: IProduct[] | string[];
}
