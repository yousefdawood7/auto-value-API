import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserSuccessResponseDto {
  @ApiProperty({
    description: 'Outcome status for the request.',
    example: 'success',
  })
  status: 'success';

  @ApiPropertyOptional({
    description:
      'Optional success message returned for actions that need extra context.',
    example: 'user signed in successfully',
  })
  message?: string;

  @ApiProperty({
    description: 'Serialized public representation of the user.',
    type: UserDto,
  })
  details: UserDto;
}
