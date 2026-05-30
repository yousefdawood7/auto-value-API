import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ZodSchema } from '../common/decorators/zod-schema.decorator';
import { createReportSchema } from './schemas/create-report.schema';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('/report')
@UseGuards(AuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ZodSchema(createReportSchema)
  createReport(@Body() body: CreateReportDto) {
    return 'CREATED SUCCESSFULLY';
  }
}
