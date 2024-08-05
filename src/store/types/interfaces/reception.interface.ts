import { IIdentifiable } from 'src/shared/types';
import { IHangar } from './hangar.interface';
import { IReceptionDetails } from './reception-details.interface';

export interface IReception extends IIdentifiable {
  numero: string;
  driver: string;
  Truck_license_plate: string;
  hangar: IHangar | string;
  receptionDetails: IReceptionDetails[] | string[];
}
