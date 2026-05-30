import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
