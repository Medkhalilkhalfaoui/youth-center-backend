import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IStore } from '../types/interfaces/store.interface';
import { Hangar } from './hangar.entity';
import { IHangar } from '../types';
import { User } from 'src/user/entities';
import { IUser } from 'src/user/types';
@Entity()
export class Store implements IStore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Hangar, (hangar) => hangar.store)
  hangars: IHangar[] | string[];

  @OneToOne(() => User, (user) => user.store)
  users: string[] | IUser[];
}
