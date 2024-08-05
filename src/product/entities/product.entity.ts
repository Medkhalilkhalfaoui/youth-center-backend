import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { IProduct, IProvider, IUnity } from '../types/interfaces';
import { Category } from 'src/category/entities';
import { ICategory } from 'src/category/types';
import { Unity } from './unity.entity';
import { Provider } from './provider.entity';
import { PurchaseDetails, ReceptionDetails } from 'src/store/entities';
import { IPurchaseDetails, IReceptionDetails } from 'src/store/types';
import { File } from 'src/file/entities';
import { IFile } from 'src/file/types';

@Entity()
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code_article: string;

  @Column({ nullable: true })
  code_a_barre: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  marque: string;

  @Column({ nullable: true })
  family: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.childrenProducts)
  parentProduct: IProduct | string;

  @RelationId((product: Product) => product.parentProduct)
  parentProductId: string;

  @OneToMany(() => Product, (product) => product.parentProduct)
  childrenProducts: IProduct[] | string[];

  @ManyToOne(() => Category, (category) => category.products)
  category: ICategory | string;

  @RelationId((product: Product) => product.category)
  categoryId: string;

  @ManyToOne(() => Unity, (unity) => unity.products)
  unity: IUnity | string;

  @RelationId((product: Product) => product.unity)
  unityId: string;

  @ManyToOne(() => Provider, (provider) => provider.products)
  provider: IProvider | string;

  @RelationId((product: Product) => product.provider)
  providerId: string;

  @OneToMany(
    () => ReceptionDetails,
    (receptionDetails) => receptionDetails.product,
  )
  receptionDetails: IReceptionDetails[] | string[];

  @OneToMany(
    () => PurchaseDetails,
    (purchaseDetails) => purchaseDetails.product,
  )
  purchaseDetails: IPurchaseDetails[] | string[];

  @OneToOne(() => File, (file) => file.product)
  @JoinColumn()
  file: IFile | string;
}
