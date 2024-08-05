import { IFindPaginationOptions } from 'src/shared/types';
import { AuditLogAction } from '../enums/audit-log-action.enum';
import { AuditLogType } from '../enums/audit-log-type.enum';

export interface FindAuditLogDao extends IFindPaginationOptions {
  user?: string;

  type?: AuditLogType;

  action?: AuditLogAction;

  date?: Date;
}
