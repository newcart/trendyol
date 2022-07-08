import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ProductService } from './product.service';
import { OrderService } from './order.service';

@Controller()
export class AppController {
  /**
   * Pazaryeri modüllerinde
   * app.module.ts dosyasında modül için gerekli temel yapılandırmalar yapılır. import edilecek hizmetler ayarlanır
   * app.controller.ts dosyasında gateway den gelen istekler karşılanır ve bu istekler servise yönlendirilir
   * app.service.ts dosyası ise isteklerin işlendiği yerdir. bu servis içinde ayrıca dto ve eventslar kullanılabilir.
   *
   * böylece her pazaryeri için üç servis olacak
   * a. productService ürün işlemleri
   * b. orderService sipariş işlemleri
   * c. appService diğer işlemler
   * @param body post işlemi ile gönderilen json datasına karşılık gelmektedir. HTTP Body dir
   */
  constructor(
      private readonly appService: AppService,
      private readonly productService: ProductService,
      private readonly orderService: OrderService
  ) {}
  /**
   * trendyol servisinin aktif çalışmasını kontrol için bir get isteği endpointi
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  /**
   * trendyol microservis test isteği endpointi
   */
  @MessagePattern('serviceTest')
  serviceTest( request ) {
    return this.appService.serviceTest( request );
  }
  /**
   * trendyol api kullanıcı hesabını kontrol için bir endpoint
   */
  @MessagePattern('testAccount')
  testAccount( request ) {
    return this.appService.testAccount( request );
  }
  /**
   * pazaryerinden ürün okuma metodu.
   * @param body içerisinde gelen datalar servise aktarılarak ürün arama işlemi serviste yapılır
   */
  @MessagePattern('postProduct')
  postProduct( request ) {
    return this.productService.postProduct( request );
  }
  /**
   * pazaryerinden ürünleri okuma metodu.
   * @param body içerisinde gelen datalar servise aktarılarak ürün arama işlemi serviste yapılıri
   */
  @MessagePattern('postProducts')
  postProducts( request ) {
    return this.productService.postProducts( request );
  }
  /**
   * pazaryerinürün kaydetme metodu.
   * @param body içerisinde gelen datalar servise aktarılarak ürün arama işlemi serviste yapılıri
   */
  @MessagePattern('postProductsSave')
  postProductsSave( request ) {
    return this.productService.postProductsSave( request );
  }
  /**
   * pazaryerinden sipariş alma metodu.
   * @param body içerisinde gelen datalar servise aktarılarak ürün arama işlemi serviste yapılıri
   */
  @MessagePattern('getOrder')
  getOrder( request ) {
    return this.orderService.getOrder( request );
  }
}
