import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { hashPassword } from '../../utils/passwordOp';

import Profile from './Profile';
import Product from './Product';
import Order from './Order';

export enum AccountType {
  MERCHANT = 'm',
  CUSTOMER = 'c',
}

@Entity('Account')
export default class Account extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  accountType: AccountType;

  @Column('boolean', { default: false })
  blocked: boolean;

  @Column('boolean', { default: false })
  verified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((_type: any) => Profile, (profile: Profile) => profile.account)
  profile: Profile;

  @OneToMany((_type: any) => Product, (product: Product) => product.account)
  product: Product[];

  @OneToMany((_type: any) => Order, (order: Order) => order.account)
  orders: Order[];

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hashPassword(this.password);
  }
}
