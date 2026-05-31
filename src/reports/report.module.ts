import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Report])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
