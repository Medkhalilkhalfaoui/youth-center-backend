import { Product } from 'src/product/entities';
import { IProduct } from 'src/product/types/interfaces';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IPurchase, IPurchaseDetails } from '../types';
import { Purchase } from './purchase.entity';

@Entity()
export class PurchaseDetails implements IPurchaseDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column({ type: 'integer', default: 0 })
  quantity_received: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.purchaseDetails)
  product: IProduct| string;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseDetails)
  purchase: IPurchase | string;

}
