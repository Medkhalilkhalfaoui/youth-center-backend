import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { hash, genSalt } from 'bcrypt';
import { IUser } from '../types';
import { AuditLog } from 'src/audit-log/entities';
import { IAuditLog } from 'src/audit-log/types';
import { Job } from '../types/enums/job.enum';
import { Purchase, Store } from 'src/store/entities';
import { IPurchase, IStore } from 'src/store/types';
import { Role } from 'src/role-permission/entities/role.entity';
import { IRole } from 'src/role-permission/types/interfaces';
import { ServiceYouthCenter, YouthCenter } from 'src/youth-house/entities';
import { IYouthCenter } from 'src/youth-house/types/interfaces';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column()
  description: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'job', enum: Job, nullable: true })
  job: Job;

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt();
    this.password = await hash(this.password.toString(), salt);
  }

  @BeforeUpdate()
  async hashUpdatedPassword() {
    if (this.password) {
      const salt = await genSalt();
      this.password = await hash(this.password.toString(), salt);
    }
  }

  @OneToMany(() => AuditLog, (auditLogs) => auditLogs.user)
  auditLogs: IAuditLog[] | string[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: IPurchase[] | string[];

  @ManyToOne(() => Store, (store) => store.users)
  store: string | IStore;

  @ManyToOne(
    () => ServiceYouthCenter,
    (serviceYouthCenter) => serviceYouthCenter.user,
  )
  serviceYouthCenter: string;

  @RelationId((user: User) => user.store)
  storeId: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: IRole | string;

  @RelationId((user: User) => user.role)
  roleId: string;

  @ManyToOne(() => YouthCenter, (youthCenter) => youthCenter.user)
  youthCenter: IYouthCenter | string;
}
