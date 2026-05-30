import { Body, Controller, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ZodSchema } from '../common/decorators/zod-schema.decorator';
import { createReportSchema } from './schemas/create-report.schema';

@Controller('/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ZodSchema(createReportSchema)
  createReport(@Body() body: CreateReportDto) {
    return 'CREATED SUCCESSFULLY';
  }
}
