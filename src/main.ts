import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
<<<<<<< Updated upstream
    options: { port: 30101 },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
=======
    options: { port: 3000 },
  });
  await app.startAllMicroservices();
  await app.listen(30101);
>>>>>>> Stashed changes
  console.log(`Trendyol Service is running on: ${await app.getUrl()}`);
}
bootstrap();
