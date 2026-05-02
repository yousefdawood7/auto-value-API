import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from './name';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column(() => Name, { prefix: false })
  name: Name;

  @Exclude()
  @Column()
  password: string;
}
