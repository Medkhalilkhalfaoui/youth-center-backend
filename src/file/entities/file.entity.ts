import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IFile } from '../types';
import { Product } from 'src/product/entities';
import { IProduct } from 'src/product/types/interfaces';
 
 

@Entity()
export class File implements IFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mimetype: string;

  @Column()
  filename: string;

  @Column({ select: false })
  originalname: string;

  @Column()
  size: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  setFileUrl() {
    if (!this.url) {
      this.url = `/${this.filename}`;
    }
  }
  @OneToOne(() => Product, (product) => product.file)
  product: string | IProduct;

  
}
