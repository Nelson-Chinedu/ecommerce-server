import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  BaseEntity,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Profile from './Profile';

@Entity('Location')
export default class Location extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((_type: any) => Profile, (profile: Profile) => profile.location, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  profile: Profile;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
