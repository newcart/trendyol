import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const HOST = configService.get('HOST')||'0.0.0.0'
  const PORT = configService.get('PORT')||30101
  const SERVICE_NAME = configService.get('SERVICE_NAME')||'TRENDYOL'
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host:HOST, port: PORT },
  });
  await app.startAllMicroservices();
  console.log( SERVICE_NAME + ' Service is runing on ' + HOST + ':' + PORT);
}
bootstrap();
