import { IIdentifiable } from 'src/shared/types';
import { IHangar } from './hangar.interface';
import { IUser } from 'src/user/types';

export interface IStore extends IIdentifiable {
  name: string;
  address: string;
  city: string;
  hangars: IHangar[] | string[];
  users: string[] | IUser[];
  isActive: boolean;
}
