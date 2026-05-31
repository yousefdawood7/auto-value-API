import { ApiProperty } from '@nestjs/swagger';

export class MessageSuccessResponseDto {
  @ApiProperty({
    description: 'Outcome status for the request.',
    example: 'success',
  })
  status: 'success';

  @ApiProperty({
    description: 'Human-readable success message.',
    example: 'user logged out successfully',
  })
  message: string;
}
