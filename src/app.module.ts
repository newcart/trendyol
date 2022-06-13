import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product.service';
import { OrderService } from './order.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ProductService,OrderService],
})
export class AppModule {}
