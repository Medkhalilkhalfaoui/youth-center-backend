import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hangar } from './hangar.entity';
import { IHangar, IPurchase, IReception, IReceptionDetails } from '../types';
import { Purchase } from './purchase.entity';
import { ReceptionDetails } from './reception-details.entity';

@Entity()
export class Reception implements IReception {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numero: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  driver: string;

  @Column()
  Truck_license_plate: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Hangar, (hangar) => hangar.receptions)
  hangar: IHangar | string;

  @ManyToOne(() => Purchase, (purchase) => purchase.receptions)
  purchase: IPurchase | string;

  @OneToMany(
    () => ReceptionDetails,
    (receptionDetails) => receptionDetails.reception,
  )
  receptionDetails: IReceptionDetails[] | string[];
}
