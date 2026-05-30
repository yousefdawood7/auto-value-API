import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(body: CreateReportDto, userId: number) {
    const report = this.repo.create({
      ...body,
      user: {
        id: userId,
      },
    });

    return this.repo.save(report);
  }
}
