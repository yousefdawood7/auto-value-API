import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ZodSchema } from '../common/decorators/zod-schema.decorator';
import { createReportSchema } from './schemas/create-report.schema';
import { AuthGuard } from '../common/guards/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { Serialize } from '../common/decorators/serialize.decorator';

@Controller('/report')
@UseGuards(AuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ZodSchema(createReportSchema)
  @Serialize(CreateReportDto)
  createReport(@Body() body: CreateReportDto, @User() userId: number) {
    return this.reportService.createReport(body, userId);
  }
}
