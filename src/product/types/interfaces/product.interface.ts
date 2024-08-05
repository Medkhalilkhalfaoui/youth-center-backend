import { ICategory } from 'src/category/types';
import { IIdentifiable } from 'src/shared/types';
import { IUnity } from './unity.interface';
import { IProvider } from './provider.interface';
import { IPurchaseDetails, IReceptionDetails } from 'src/store/types';
import { IFile } from 'src/file/types';

export interface IProduct extends IIdentifiable {
  name: string;
  description: string;
  isActive: boolean;
  code_a_barre: string;
  code_article: string;
  marque: string;
  family: string;
  childrenProducts: IProduct[] | string[];
  parentProductId: string;
  parentProduct: IProduct | string;
  category: ICategory | string;
  unity: IUnity | string;
  provider: IProvider | string;
  purchaseDetails: IPurchaseDetails[] | string[];
  receptionDetails: IReceptionDetails[] | string[];
  file: IFile | string;
}
