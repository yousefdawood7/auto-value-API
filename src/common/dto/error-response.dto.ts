import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorDetailsDto {
  @ApiProperty({
    description:
      'Field-level validation errors keyed by the invalid property name.',
    additionalProperties: {
      type: 'string',
    },
    example: {
      email: 'Invalid email address',
      password: 'Password must be at least 8 characters',
    },
  })
  fieldErrors: Record<string, string>;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Outcome status for the failed request.',
    enum: ['fail', 'error'],
    example: 'fail',
  })
  status: 'fail' | 'error';

  @ApiProperty({
    description: 'HTTP status code returned by the API.',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Human-readable error message.',
    example: 'Validation failed',
  })
  message: string;
}

export class ValidationErrorResponseDto extends ErrorResponseDto {
  @ApiProperty({
    description: 'Structured details describing the validation failure.',
    type: ValidationErrorDetailsDto,
  })
  details: ValidationErrorDetailsDto;
}
