import { Exclude, Expose, Transform } from 'class-transformer';

export class UserDto {
  email: string;
  firstName: string;

  @Transform(({ value }: { value?: string }) => value ?? undefined)
  lastName?: string;

  @Exclude()
  password: string;

  @Exclude()
  isAdmin: boolean;

  @Expose()
  fullName?() {
    // prettier-ignore
    if (!this.lastName)
      return;
    return `${this.firstName} ${this.lastName}`;
  }
}
