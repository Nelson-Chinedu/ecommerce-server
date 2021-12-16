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
  JoinColumn,
} from 'typeorm';

import Account from './Account';
import Location from './Location';
import Store from './Store';

@Entity('Profile')
export default class Profile extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  firstname: string;

  @Column('varchar')
  lastname: string;

  @Column('varchar')
  phoneNumber: string;

  @Column('varchar', { nullable: true })
  gender: string;

  @Column('varchar')
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((_type: any) => Location, (location: Location) => location.profile)
  location: Location;

  @OneToOne((_type: any) => Store, (store: Store) => store.profile)
  store: Store;

  @OneToOne((_type: any) => Account, (account: Account) => account.profile, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  account: Account;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
