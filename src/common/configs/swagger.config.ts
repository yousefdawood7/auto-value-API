import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const buildSwaggerDocument = (app: INestApplication) => {
  const port = process.env.PORT ?? '3000';
  const localServerUrl = `http://localhost:${port}`;
  const configuredServerUrl = process.env.APP_URL ?? localServerUrl;

  const config = new DocumentBuilder()
    .setTitle('Auto Value API')
    .setDescription(
      [
        'Production-ready OpenAPI documentation for the Auto Value API.',
        'Authentication is currently implemented with signed session cookies created by the auth endpoints.',
        'A bearer scheme is also exposed for API tooling compatibility, but the active runtime guard checks the authenticated session cookie.',
      ].join(' '),
    )
    .setVersion('1.0.0')
    .addTag(
      'Authentication',
      'Create, validate, and revoke authenticated user sessions.',
    )
    .addTag(
      'Reports',
      'Submit vehicle pricing reports for authenticated users.',
    )
    .addTag('Users', 'Reserved namespace for user-focused operations.')
    .addTag('System', 'Infrastructure and system endpoints.')
    .addCookieAuth(
      'session',
      {
        type: 'apiKey',
        in: 'cookie',
        name: 'session',
        description:
          'Signed session cookie returned by the signup or signin endpoint. The runtime also sets a companion signature cookie.',
      },
      'session',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Exposed for OpenAPI tooling compatibility. The current implementation authorizes protected routes with the signed session cookie instead of JWT bearer tokens.',
      },
      'bearer',
    )
    .addServer(configuredServerUrl, 'Configured application server')
    .build();

  if (configuredServerUrl !== localServerUrl) {
    config.servers = [
      ...(config.servers ?? []),
      {
        url: localServerUrl,
        description: 'Local development server',
      },
    ];
  }

  return SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  });
};
