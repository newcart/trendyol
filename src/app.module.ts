import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { UtilService } from './util.service';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ProductService,OrderService,UtilService, ConfigService],
})
export class AppModule {}
