import { IIdentifiable } from 'src/shared/types';
import { IStore } from './store.interface';

export interface IHangar extends IIdentifiable {
  name: string;
  store: IStore | string;
  isActive: boolean;
  surface:number;
}
