import { Injectable } from '@nestjs/common';
import { UtilService } from './util.service';

@Injectable()
export class ProductService {
  constructor(
      private util: UtilService
  ) {}

  async testAccount(data): Promise<any> {
    return 'Hello World! Tendyol getProduct';
  }
  async postProductsSave(data): Promise<any> {
    const products = this.util.convertProducts(data);
    return products;
  }
  async postProducts(data): Promise<any> {
    const supplierId = data['body']['seller_id'];
    const page = data['body']['page'];
    const size = data['body']['size'];
    const endpoint = `suppliers/${supplierId}/products`;
    const requestData = { page:page, size:size };
    const response = await this.util.sendToEndpoint('get', endpoint, requestData, data['body']);
    if(response['totalElements']){
      return response;
    } else {
      if(response["exception"]=="true"){
        return this.util.failureResponse("İstek hata ile sonuçandı. " + response["message"]);
      } else {
        return this.util.failureResponse("Ürün Bulunamadı");
      }
    }
    return response['totalElements'].toString();
  }
  async postProduct(data): Promise<any> {
    const supplierId = data['body']['seller_id'];
    const stockCode = data['body']['prodcut_code'];
    const endpoint = `suppliers/${supplierId}/products`;
    const requestData = { "stockCode" : stockCode };
    const response = await this.util.sendToEndpoint('get', endpoint, requestData, data['body']);
    if(response['totalElements']){
      return response['content'];
    } else {
      if(response["exception"]=="true"){
        return this.util.failureResponse("İstek hata ile sonuçandı. " + response["message"]);
      } else {
        return this.util.failureResponse("Ürün Bulunamadı");
      }
    }
    return response['totalElements'].toString();
  }
}
