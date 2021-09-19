import { v4 as uuidv4 } from 'uuid';
import {
  PrimaryColumn,
  Column,
  Entity,
  BaseEntity,
  OneToOne,
  BeforeInsert,
} from 'typeorm';

import Account from './Account';

@Entity('Profile')
export default class Profile extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  firstname: string;

  @Column('varchar', { length: 255 })
  lastname: string;

  @Column('varchar', { nullable: true })
  phoneNumber: string;

  @Column('varchar')
  gender: string;

  @Column('varchar')
  region: string;

  @Column('varchar', { nullable: true })
  city: string;

  @Column('varchar', { nullable: true })
  country: string;

  @Column('varchar', { nullable: true })
  address: string;

  @Column('varchar')
  imageUrl: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @Column('timestamp', {
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @OneToOne((_type: any) => Account, (account: Account) => account.profile)
  account: Account;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
