import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ZodSchema } from '../common/decorators/zod-schema.decorator';
import { createReportSchema } from './schemas/create-report.schema';
import { AuthGuard } from '../common/guards/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { Serialize } from '../common/decorators/serialize.decorator';
import {
  ErrorResponseDto,
  ValidationErrorResponseDto,
} from '../common/dto/error-response.dto';
import { ReportDto } from './dto/report.dto';
import { ReportSuccessResponseDto } from './dto/report-success-response.dto';

@Controller('/report')
@UseGuards(AuthGuard)
@ApiTags('Reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ZodSchema(createReportSchema)
  @Serialize(ReportDto)
  @ApiOperation({
    summary: 'Create a valuation report',
    description:
      'Creates a vehicle valuation report for the currently authenticated user. A valid signed session cookie is required before this endpoint can be used.',
  })
  @ApiConsumes('application/json')
  @ApiCookieAuth('session')
  @ApiBearerAuth('bearer')
  @ApiBody({
    type: CreateReportDto,
    description: 'Vehicle information used to create the pricing report.',
    examples: {
      default: {
        summary: 'Passenger car valuation payload',
        value: {
          manufacturer: 'Toyota',
          model: 'Corolla',
          year: 2021,
          mileage: 38500,
          price: 19500,
          lat: 29.9792,
          lng: 31.1342,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'The valuation report was created successfully.',
    type: ReportSuccessResponseDto,
    schema: {
      example: {
        status: 'success',
        details: {
          id: 84,
          manufacturer: 'Toyota',
          model: 'Corolla',
          year: 2021,
          mileage: 38500,
          price: 19500,
          lat: 29.9792,
          lng: 31.1342,
          userId: 17,
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'The request body failed schema validation.',
    type: ValidationErrorResponseDto,
    schema: {
      example: {
        status: 'fail',
        statusCode: 400,
        message: 'Validation failed',
        details: {
          fieldErrors: {
            year: 'Year must be at most from 2050',
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description:
      'The request was sent without a valid authenticated session cookie.',
    type: ErrorResponseDto,
    schema: {
      example: {
        status: 'fail',
        statusCode: 401,
        message: 'You are not currently signed in',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'The server failed while creating the report.',
    type: ErrorResponseDto,
    schema: {
      example: {
        status: 'error',
        statusCode: 500,
        message: 'Something went wrong',
      },
    },
  })
  createReport(@Body() body: CreateReportDto, @User() userId: number) {
    return this.reportService.createReport(body, userId);
  }
}
