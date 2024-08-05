import { IIdentifiable } from 'src/shared/types';
import { IUser } from 'src/user/types';
import { AuditLogAction } from '../enums/audit-log-action.enum';
import { AuditLogType } from '../enums/audit-log-type.enum';

export interface IAuditLog extends IIdentifiable {
  user: IUser | string;
  action: AuditLogAction;
  type: AuditLogType;
  data: string;
}
