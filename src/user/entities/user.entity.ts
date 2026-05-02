import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from './name';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Transform(({ value }: { value: { first: string; last?: string } }) =>
    value.last ? value : { first: value.first },
  )
  @Column(() => Name, { prefix: false })
  name: Name;

  @Exclude()
  @Column()
  password: string;

  @Expose()
  get fullName(): string | void {
    // prettier-ignore
    if (!this.name.last)
      return;
    return `${this.name.first} ${this.name.last}`;
  }
}
