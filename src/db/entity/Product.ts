import { v4 as uuidv4 } from 'uuid';
import randomString from 'randomstring';
import {
  BaseEntity,
  PrimaryColumn,
  Column,
  JoinColumn,
  Entity,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';

import Account from './Account';

@Entity('Product')
export default class Product extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  productNumber: string;

  @Column('varchar')
  productName: string;

  @Column('varchar')
  productDescription: string;

  @Column('varchar', { array: true })
  productSizes: string[];

  @Column('varchar', { array: true })
  colors: string[];

  @Column('varchar', { array: true })
  category: string[];

  @Column('varchar')
  stock: string;

  @Column('varchar')
  sold: string;

  @Column('varchar', { array: true })
  tags: string[];

  @Column('varchar')
  revenue: string;

  @Column('varchar')
  oldPrice: string;

  @Column('varchar')
  newPrice: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @Column('timestamp', {
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @ManyToOne((_type: any) => Account, (account: Account) => account.product, {
    onDelete: 'CASCADE',
    eager: true,
  })

  // account: Account;
  @JoinColumn()
  account: Account;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
    this.productNumber = randomString.generate({
      length: 6,
      charset: 'numeric',
    });
  }
}
