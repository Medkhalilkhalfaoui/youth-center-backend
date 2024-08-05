import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { IService, IYouthCenter } from '../types/interfaces';
import { YouthCenter } from './youth-center.entity';
import { User } from 'src/user/entities';
import { IUser } from 'src/user/types';

@Entity()
export class ServiceYouthCenter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Service, (service) => service.serviceYouthCenter)
  service: IService | string;

  @ManyToOne(() => YouthCenter, (youthCenter) => youthCenter.serviceYouthCenter)
  youthCenter: IYouthCenter | string;


  @OneToMany(
    () => User,
    (user) => user.serviceYouthCenter,
  )
  user: IUser[] | string[];
}
