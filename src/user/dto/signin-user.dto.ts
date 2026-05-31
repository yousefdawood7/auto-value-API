import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({
    description: 'Email address associated with the existing account.',
    example: 'john.doe@autovalue.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Plain-text password for the existing account.',
    example: 'SecurePass123!',
    minLength: 8,
  })
  password: string;
}
