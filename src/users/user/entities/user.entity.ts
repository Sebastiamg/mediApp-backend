import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Profile, Role } from '../../';

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
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn()
  role: Role;

  //appointment

  @BeforeInsert()
  UpperName() {
    this.firstname = this.firstname
      .charAt(0)
      .toUpperCase()
      .concat(this.firstname.slice(1));
  }
}

@Entity()
export class Medic extends User {
  // Medic atribte
  @Column({ type: 'text', nullable: true })
  speciality?: string;
  //appointment
}
