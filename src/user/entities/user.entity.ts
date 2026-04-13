import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from './name';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => Name, { prefix: false })
  name: Name;

  @Column()
  password: string;
}
