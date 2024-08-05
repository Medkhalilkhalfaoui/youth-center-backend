import { IIdentifiable } from 'src/shared/types';

export interface IService extends IIdentifiable {
  name: string;
  description: string;
  isActive: boolean;
}
