import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 30101 },
  });
  console.log(`Trendyol Service is listening on 30101`);
  await app.startAllMicroservices();
}
bootstrap();
