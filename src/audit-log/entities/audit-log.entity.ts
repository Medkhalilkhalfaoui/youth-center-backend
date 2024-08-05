import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IAuditLog } from '../types/interfaces/audit-log.interface';

import { AuditLogAction } from '../types/enums/audit-log-action.enum';
import { User } from 'src/user/entities';
import { IUser } from 'src/user/types';
import { AuditLogType } from '../types/enums/audit-log-type.enum';

@Entity()
export class AuditLog implements IAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    name: 'AuditLogAction',
    enum: AuditLogAction,
  })
  action: AuditLogAction;

  @Column({
    name: 'AuditLogType',
    enum: AuditLogType,
  })
  type: AuditLogType;

  @Column({type: 'nvarchar', length: '4000'})
    data: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.auditLogs)
  user: IUser | string;
}
