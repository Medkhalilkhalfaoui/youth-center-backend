import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reception } from './reception.entity';
import {
  IHangarReceptionDetails,
  IReception,
  IReceptionDetails,
} from '../types';
import { Product } from 'src/product/entities';
import { IProduct } from 'src/product/types/interfaces';
import { HangarReceptionDetails } from './hangar-reception-details.entity';
import { YouthCenter } from 'src/youth-house/entities';
import { IYouthCenter } from 'src/youth-house/types/interfaces';

@Entity()
export class ReceptionDetails implements IReceptionDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  quantity: Number;

  @ManyToOne(() => Reception, (reception) => reception.receptionDetails)
  reception: IReception | string;

  @ManyToOne(() => Product, (product) => product.receptionDetails)
  product: IProduct | string;

  @ManyToOne(() => YouthCenter, (youthCenter) => youthCenter.receptionDetails)
  youthCenter: IYouthCenter | string;

  @OneToMany(
    () => HangarReceptionDetails,
    (hangarReceptionDetails) => hangarReceptionDetails.receptionDetails,
  )
  hangarReceptionDetails: IHangarReceptionDetails[] | string[];
}
