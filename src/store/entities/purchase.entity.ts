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
import { IPurchase, IPurchaseDetails, IReception } from '../types';
import { PurchaseDetails } from './purchase-details.entity';
import { User } from 'src/user/entities';
import { IUser } from 'src/user/types';
import { Status } from '../types/enums';

@Entity()
export class Purchase implements IPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numero: String;

  @Column({ nullable: true })
  provider_name: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    name: 'status',
    enum: Status,
    nullable: true,
    default: Status.PENDING,
  })
  status: Status;

  @OneToMany(() => Reception, (reception) => reception.purchase)
  receptions: IReception[] | string[];

  @OneToMany(
    () => PurchaseDetails,
    (purchaseDetails) => purchaseDetails.purchase,
  )
  purchaseDetails: IPurchaseDetails[] | string[];

  @ManyToOne(() => User, (user) => user.purchases)
  user: IUser | string;
}
