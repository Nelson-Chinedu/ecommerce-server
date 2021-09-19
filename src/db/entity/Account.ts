import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';

import { hashPassword } from '../../utils/passwordOp';

import Profile from './Profile';

@Entity('Account')
export default class Account extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column({ default: false })
  blocked: boolean;

  @Column({ default: false })
  verified: boolean;

  @Column('varchar')
  accountType: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP(3)' })
  createdAt: Date;

  @Column('timestamp', {
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @OneToOne((_type: any) => Profile, (profile: Profile) => profile.account, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  profile: Profile;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hashPassword(this.password);
  }
}
