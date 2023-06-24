import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/base.entity';
import { User } from '../../';

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

  @OneToOne(() => User, (user) => user.profile, {
    onUpdate: 'CASCADE',
  })
  user: User;

  @BeforeInsert()
  UpperName() {
    this.lastname &&
      (this.lastname = this.lastname
        .charAt(0)
        .toUpperCase()
        .concat(this.lastname.slice(1)));
  }
}
