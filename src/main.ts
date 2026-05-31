import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { buildSwaggerDocument } from './common/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerDocument = buildSwaggerDocument(app);

  SwaggerModule.setup('docs', app, swaggerDocument, {
    jsonDocumentUrl: '/docs-json',
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
