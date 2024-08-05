import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IHangar, IHangarReceptionDetails, IReception, IStore } from '../types';
import { Store } from './store.entity';
import { Reception } from './reception.entity';
import { HangarReceptionDetails } from './hangar-reception-details.entity';
@Entity()
export class Hangar implements IHangar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surface:number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Store, (store) => store.hangars)
  store: IStore | string;

  @OneToMany(() => Reception , (reception) => reception.hangar)
  receptions: IReception[] | string[];

  @OneToMany(() => HangarReceptionDetails , (hangarReceptionDetails) => hangarReceptionDetails.hangar)
  hangarReceptionDetails: IHangarReceptionDetails[] | string[];
}
