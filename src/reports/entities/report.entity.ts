import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  manufacturer: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  price: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column({ default: false })
  isApproved: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
