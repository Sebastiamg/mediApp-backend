import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../';

export enum ROLES {
  PACIENT = 'pacient',
  MEDIC = 'medic',
  ADMIN = 'admin',
}

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'role_name',
    default: ROLES.PACIENT,
    unique: true,
    nullable: true,
  })
  name: string;

  // relations
  // USER
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
