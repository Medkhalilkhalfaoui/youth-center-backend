import { IIdentifiable } from 'src/shared/types';
import { IReception } from './reception.interface';
import { IPurchaseDetails } from './purchase-details.interface';
import { IUser } from 'src/user/types';
import { Status } from '../enums';

export interface IPurchase extends IIdentifiable {
  numero: String;
  provider_name: String;
  status: Status;
  receptions: IReception[] | string[];
  purchaseDetails: IPurchaseDetails[] | string[];
  user: IUser | string;
}
