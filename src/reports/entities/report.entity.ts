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

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  // Longitude ranges from -180 to 180
  @Column({ type: 'decimal', precision: 11, scale: 7 })
  longitude: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
