import { Medic, User } from 'src/users';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  hour: string;

  @Column()
  status: string;

  // relation
  // User
  @ManyToOne(() => User, (user) => user.appointment)
  user: User;

  // Medic
  @ManyToOne(() => Medic, (medic) => medic.appointment)
  medic: Medic;
}
