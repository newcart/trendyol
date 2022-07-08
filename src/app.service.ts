import { Injectable, Catch } from '@nestjs/common';
import { UtilService } from './util.service';

@Injectable()
export class AppService {
  constructor(
      private util: UtilService
  ) {}
  getHello(): string {
    return 'Trendyol Service is runing... Report from direct service';
  }
  async serviceTest(body): Promise<any> {
    return "Trendyol Service is runing. Message From service via TCP method.";
  }
  async testAccount(data): Promise<any> {
    const supplierId = data['body']['seller_id'];
    const endpoint = `suppliers/${supplierId}/products`;
    const requestData = { "approved" : "true" };
    const response = await this.util.sendToEndpoint('get', endpoint, requestData, data['body']);
    if(response['totalElements']){
      return this.util.successResponse( [], "Trendyol ile bağlantı kuruldu. Toplam aktif ürün adedi: " + response['totalElements']);
    } else {
      if(response["exception"]=="true"){
        return this.util.failureResponse("İstek hata ile sonuçandı. " + response["message"]);
      } else {
        return this.util.failureResponse("Hesabınız doğrulanmadı");
      }
    }
    return response['totalElements'].toString();
  }
}
