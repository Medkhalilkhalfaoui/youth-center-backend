import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { YouthCenter } from './youth-center.entity';
import { IService, IYouthCenter } from '../types/interfaces';
import { ServiceYouthCenter } from './service-youth-center.entity';

@Entity()
export class Service implements IService {
  
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
  description: string;

  @OneToMany(
    () => ServiceYouthCenter,
    (serviceYouthCenter) => serviceYouthCenter.service,
  )
  serviceYouthCenter:   string[];

}
