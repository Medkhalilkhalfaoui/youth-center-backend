import { IIdentifiable } from 'src/shared/types';
import { IService } from './service.interface';

export interface IYouthCenter extends IIdentifiable {
  name: string;
  address: string;
  city: string;
  governorate: string;
 // services: IService[] | string[];
  isActive: boolean;
}
