import { timeStamp } from 'console';
import { Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: timeStamp(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;
}
