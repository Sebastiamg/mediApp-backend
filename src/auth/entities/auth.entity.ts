import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/base.entity';

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  lastname: string;

  @Column({ unique: true, nullable: true })
  idCard: number;

  @Column({ nullable: true })
  phone: number;
}
