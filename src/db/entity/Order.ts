import { v4 as uuidv4 } from 'uuid';
import randomString from 'randomstring';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';

import Product from './Product';
import Account from './Account';

export enum Status {
  processing = 'processing',
  canceled = 'cancelled',
  delivered = 'delivered',
}

@Entity('Order')
export default class Order extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  orderId: string;

  @Column('varchar')
  merchantId: string;

  @Column('varchar')
  customerId: string;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((_type: any) => Product, (product: Product) => product.orders)
  product: Product;

  @ManyToOne((_type: any) => Account, (account: Account) => account.orders)
  account: Account;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
    this.orderId = randomString.generate({
      length: 6,
      charset: 'numeric',
    });
    this.status = Status.processing;
  }
}
