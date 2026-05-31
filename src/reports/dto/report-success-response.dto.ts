import { ApiProperty } from '@nestjs/swagger';
import { ReportDto } from './report.dto';

export class ReportSuccessResponseDto {
  @ApiProperty({
    description: 'Outcome status for the request.',
    example: 'success',
  })
  status: 'success';

  @ApiProperty({
    description: 'Serialized report returned by the API.',
    type: ReportDto,
  })
  details: ReportDto;
}
