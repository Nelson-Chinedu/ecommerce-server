import { v4 as uuidv4 } from 'uuid';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import Profile from './Profile';
import Product from './Product';

@Entity('Store')
export default class Store extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar')
  currency: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((_type: any) => Profile, (profile: Profile) => profile.store)
  @JoinColumn()
  profile: Profile;

  @OneToMany((_type: any) => Product, (product: Product) => product.store)
  product: Product[];

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
