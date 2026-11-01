import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);
  const corsOrigin = configService.get<string>(
    'app.corsOrigin',
    'http://localhost:5173',
  );

  // Standardized CORS configuration
  app.enableCors({
    origin: [corsOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global REST API prefix: /api
  app.setGlobalPrefix('api');

  // Centralized Error Handling & Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);
  logger.log(
    `Autonomous Business Finance API running on http://localhost:${port}/api`,
  );
  logger.log(
    `Health endpoint available at http://localhost:${port}/api/health`,
  );
}

await bootstrap();
