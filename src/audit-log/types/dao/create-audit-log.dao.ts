import { IsNotEmpty } from 'class-validator';
import { AuditLogAction } from '../enums/audit-log-action.enum';
import { AuditLogType } from '../enums/audit-log-type.enum';

export class CreateAuditLogDao {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  action: AuditLogAction;

  @IsNotEmpty()
  type: AuditLogType;

  @IsNotEmpty()
  data: string;
}
