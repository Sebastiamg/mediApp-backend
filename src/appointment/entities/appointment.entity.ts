import { User } from 'src/users';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  hour: string;

  @Column()
  status: boolean;

  // relation
  // Medic
  @OneToOne(() => User)
  medic: User;

  // User
  user: User;
}
