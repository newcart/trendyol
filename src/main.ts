import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 30102 },
  });
  await app.startAllMicroservices();
  await app.listen(30101);
  console.log(`Trendyol Service is running on: 30102`);
}
bootstrap();
