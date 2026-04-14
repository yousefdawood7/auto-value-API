import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe';
import { SchemaService } from './common/schema/schema.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const schemaService = app.get(SchemaService);
  app.useGlobalPipes(new ZodValidationPipe(schemaService));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
