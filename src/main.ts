import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceExceptionFilter } from './app/ErrorBoundary/microservice-exception.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MicroserviceExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
