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

export enum Status {
  pending = 'pending',
  canceled = 'canceled',
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

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
    this.orderId = randomString.generate({
      length: 6,
      charset: 'numeric',
    });
    this.status = Status.pending;
  }
}
