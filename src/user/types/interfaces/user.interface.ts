import { IStore } from 'src/store/types';
import { IIdentifiable } from '../../../shared/types';
import { Job } from '../enums/job.enum';
import { IRole } from 'src/role-permission/types/interfaces';
import { IYouthCenter } from 'src/youth-house/types/interfaces';

export interface IUser extends IIdentifiable {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  phoneNumber: string;
  email: string;
  description: string;
  job: Job;
  store: string | IStore;
  storeId: string;
  role: IRole | string;
  roleId: string;
  youthCenter: IYouthCenter | string;
}
