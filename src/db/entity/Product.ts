import { v4 as uuidv4 } from 'uuid';
import randomString from 'randomstring';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Account from './Account';

export enum Product_Size {
  SMALL = 'S',
  MEDIUM = 'M',
  LARGE = 'L',
  EXTRA_LARGE = 'XL',
}

export enum Stock {
  IN_STOCK = 'In-stock',
  OUT_OF_STOCK = 'Out-of-stock',
}

@Entity('Product')
export default class Product extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  number: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column({ array: true, type: 'enum', enum: Product_Size, nullable: true })
  sizes: Product_Size[];

  @Column('varchar', { array: true })
  colors: string[];

  @Column('varchar')
  category: string;

  @Column({ type: 'enum', enum: Stock, nullable: true })
  stock: Stock;

  @Column('varchar')
  oldPrice: string;

  @Column('varchar')
  newPrice: string;

  @Column('varchar', { array: true })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((_type: any) => Account, (account: Account) => account.product)
  account: Account;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
    this.number = randomString.generate({
      length: 6,
      charset: 'numeric',
    });
  }
}
