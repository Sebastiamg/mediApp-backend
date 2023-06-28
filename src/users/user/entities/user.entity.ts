import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Profile, Role, UserDto } from '../../';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { OmitType, PartialType } from '@nestjs/mapped-types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 40,
    name: 'first_name',
  })
  firstname: string;

  @Column('varchar', {
    length: 30,
    unique: true,
  })
  email: string;

  @Column({ type: 'text' })
  password: string;

  // Relations
  // Profile
  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;

  // Role
  @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
  })
  @JoinColumn()
  role: Role;

  // Appointment
  @OneToMany(() => Appointment, (appointment) => appointment.user, {
    eager: true,
  })
  @JoinColumn()
  appointment: Appointment[];

  @BeforeInsert()
  UpperName() {
    this.firstname = this.firstname
      .charAt(0)
      .toUpperCase()
      .concat(this.firstname.slice(1));
  }
}

@Entity()
export class Medic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Medic atribte
  @Column({ type: 'text', nullable: true })
  speciality?: string;

  @Column({
    type: 'varchar',
    length: 40,
    name: 'first_name',
    nullable: true,
  })
  firstname: string;

  @Column('varchar', {
    length: 30,
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  // Relations
  // Profile
  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;

  // Role
  @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
  })
  @JoinColumn()
  role: Role;

  //appointment
  @OneToMany(() => Appointment, (appointment) => appointment.medic, {
    eager: true,
  })
  @JoinColumn()
  appointment: Appointment[];

  @BeforeInsert()
  UpperName() {
    this.firstname = this.firstname
      .charAt(0)
      .toUpperCase()
      .concat(this.firstname.slice(1));
  }
}
