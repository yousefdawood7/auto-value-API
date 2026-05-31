import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique email address used to identify the user account.',
    example: 'john.doe@autovalue.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Given name of the user registering the account.',
    example: 'John',
    minLength: 3,
  })
  firstName: string;

  @ApiPropertyOptional({
    description: 'Family name of the user registering the account.',
    example: 'Doe',
    minLength: 3,
    nullable: true,
  })
  lastName?: string;

  @ApiProperty({
    description:
      'Plain-text password supplied during signup. The API stores a salted hash instead of this raw value.',
    example: 'SecurePass123!',
    minLength: 8,
  })
  password: string;
}
