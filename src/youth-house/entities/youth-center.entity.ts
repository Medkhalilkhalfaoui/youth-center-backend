import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { IService, IYouthCenter } from '../types/interfaces';
import { ReceptionDetails } from 'src/store/entities';
import { IReceptionDetails } from 'src/store/types';
import { ServiceYouthCenter } from './service-youth-center.entity';
import { User } from 'src/user/entities';
import { IUser } from 'src/user/types';

@Entity()
export class YouthCenter implements IYouthCenter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  governorate: string;

  @OneToMany(
    () => ServiceYouthCenter,
    (serviceYouthCenter) => serviceYouthCenter.youthCenter,
  )
  serviceYouthCenter: string[];

  @OneToMany(
    () => ReceptionDetails,
    (receptionDetails) => receptionDetails.youthCenter,
  )
  receptionDetails: IReceptionDetails[] | string[];

  @OneToMany(() => User, (user) => user.youthCenter)
  user: IUser[] | string[];
}
