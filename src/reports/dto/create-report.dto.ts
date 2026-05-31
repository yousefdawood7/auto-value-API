import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({
    description: 'Vehicle manufacturer or brand.',
    example: 'Toyota',
    minLength: 3,
  })
  manufacturer: string;

  @ApiProperty({
    description: 'Vehicle model name.',
    example: 'Corolla',
    minLength: 3,
  })
  model: string;

  @ApiProperty({
    description: 'Model year of the vehicle.',
    example: 2021,
    minimum: 1900,
    maximum: 2050,
  })
  year: number;

  @ApiProperty({
    description: 'Current odometer reading in kilometers.',
    example: 38500,
    minimum: 500,
  })
  mileage: number;

  @ApiProperty({
    description: 'Expected asking price in USD.',
    example: 19500,
    minimum: 500,
  })
  price: number;

  @ApiProperty({
    description: 'Latitude where the vehicle is located.',
    example: 29.9792,
    minimum: -90,
    maximum: 90,
  })
  lat: number;

  @ApiProperty({
    description: 'Longitude where the vehicle is located.',
    example: 31.1342,
    minimum: -180,
    maximum: 180,
  })
  lng: number;
}
