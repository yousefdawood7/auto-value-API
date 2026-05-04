import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  @Transform(({ value }: { value?: string }) => value ?? undefined)
  lastName?: string;

  @Exclude()
  @Column()
  password: string;

  @Expose()
  get fullName(): string | undefined {
    // prettier-ignore
    if (!this.lastName)
      return;
    return `${this.firstName} ${this.lastName}`;
  }
}
