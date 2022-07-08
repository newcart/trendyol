import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { UtilService } from './util.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ProductService,OrderService,UtilService],
})
export class AppModule {}
