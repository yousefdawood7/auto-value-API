import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import path from 'node:path';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  ssl: true,
  url: configService.getOrThrow<string>('DATABASE_URL'),
  entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],

  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
