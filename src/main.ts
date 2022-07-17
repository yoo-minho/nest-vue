import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.get(PrismaService).enableShutdownHooks(app);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
