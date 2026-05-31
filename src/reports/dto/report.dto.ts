import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class ReportDto {
  @ApiProperty({
    description: 'Unique identifier generated for the vehicle report.',
    example: 84,
    readOnly: true,
  })
  id: number;

  @ApiProperty({
    description: 'Vehicle manufacturer or brand.',
    example: 'Toyota',
  })
  manufacturer: string;

  @ApiProperty({
    description: 'Vehicle model name.',
    example: 'Corolla',
  })
  model: string;

  @ApiProperty({
    description: 'Model year of the vehicle.',
    example: 2021,
  })
  year: number;

  @ApiProperty({
    description: 'Current odometer reading in kilometers.',
    example: 38500,
  })
  mileage: number;

  @ApiProperty({
    description: 'Expected asking price in USD.',
    example: 19500,
  })
  price: number;

  @ApiProperty({
    description: 'Latitude where the vehicle is located.',
    example: 29.9792,
  })
  lat: number;

  @ApiProperty({
    description: 'Longitude where the vehicle is located.',
    example: 31.1342,
  })
  lng: number;

  @ApiHideProperty()
  @Exclude()
  isApproved: boolean;

  @ApiProperty({
    description: 'Identifier of the authenticated user who created the report.',
    example: 17,
    readOnly: true,
  })
  userId: number;
}
