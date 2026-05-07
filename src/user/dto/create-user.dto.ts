import { Exclude, Expose, Transform } from 'class-transformer';

export class CreateUserDto {
  email: string;
  firstName: string;

  @Transform(({ value }: { value?: string }) => value ?? undefined)
  lastName?: string;

  @Exclude()
  password: string;

  @Expose()
  fullName?() {
    // prettier-ignore
    if (!this.lastName)
      return;
    return `${this.firstName} ${this.lastName}`;
  }
}
