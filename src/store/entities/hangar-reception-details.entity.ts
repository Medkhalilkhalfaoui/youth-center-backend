import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IHangar, IHangarReceptionDetails, IReceptionDetails } from '../types';
import { Hangar } from './hangar.entity';
import { ReceptionDetails } from './reception-details.entity';

@Entity()
export class HangarReceptionDetails implements IHangarReceptionDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Hangar, (hangar) => hangar.hangarReceptionDetails)
  hangar: IHangar | string;

  @ManyToOne(() => ReceptionDetails, (receptionDetails) => receptionDetails.hangarReceptionDetails)
  receptionDetails: IReceptionDetails | string;
}
