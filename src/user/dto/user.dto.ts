import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier generated for the user.',
    example: 17,
    readOnly: true,
  })
  id: number;

  @ApiProperty({
    description: 'Unique email address for the authenticated user.',
    example: 'john.doe@autovalue.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Given name of the user.',
    example: 'John',
  })
  firstName: string;

  @ApiPropertyOptional({
    description: 'Family name of the user.',
    example: 'Doe',
    nullable: true,
  })
  @Transform(({ value }: { value?: string }) => value ?? undefined)
  lastName?: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiPropertyOptional({
    description:
      'Convenience field derived from the first and last name when both are available.',
    example: 'John Doe',
    readOnly: true,
  })
  @Expose()
  get fullName(): string | undefined {
    return this.lastName ? `${this.firstName} ${this.lastName}` : undefined;
  }
}
