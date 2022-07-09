import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host:configService.get('HOST')||'0.0.0.0', port: configService.get('PORT')||30101 },
  });
  await app.startAllMicroservices();
  console.log(
      (configService.get('SERVICE_NAME')||'UNNAMED') +
      ' Service is runing on ' +
      (configService.get('HOST')||'0.0.0.0') +
      ':' +
      (configService.get('PORT')||30101 ));
}
bootstrap();
