import { Column } from 'typeorm';

export class Name {
  @Column({ name: 'firstName' })
  first: string;

  @Column({ name: 'lastName', nullable: true })
  last: string;
}
