import { Injectable, Catch } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  private url = "https://api.trendyol.com/sapigw/";
  constructor(private httpService: HttpService) {}
  getHello(): string {
    return 'Trendyol Service is runing... Report from direct service';
  }
  async serviceTest(body): Promise<any> {
    return "Trendyol Service is runing. Message From service via TCP method.";
  }
  async testAccount(data): Promise<any> {
    const supplierId = data['seller_id'];
    const endpoint = `suppliers/${supplierId}/products?approved=true`;
    const basicAuth = data['api_key'].toString('base64') + ':' + data['secret_key'].toString('base64');
    const headers =  {
      'Content-Type': 'application/json',
      "user-agent": supplierId + " - SelfIntegration",
      "Authorization": 'Basic ' + Buffer.from(basicAuth).toString('base64')
    }
    const requestData = { "approved" : "true" };
    const response = await this.sendToEndpoint(endpoint, requestData, headers);
    if(response['totalElements']){
      return this.successResponse( [], "Trendyol ile bağlantı kuruldu. Toplam aktif ürün adedi: " + response['totalElements']);
    } else {
      if(response["exception"]=="true"){
        return this.failureResponse("İstek hata ile sonuçandı. " + response["message"]);
      } else {
        return this.failureResponse("Hesabınız doğrulanmadı");
      }

    }
    return response['totalElements'].toString();
  }

  async sendToEndpoint(endPoint, requestData, headers): Promise<any> {
    var response = {};
    try {
      const url = this.url + endPoint;
      const axiosConfig: AxiosRequestConfig = {
        method: 'get',
        url: url,
        headers: headers,
        validateStatus: function (status: number) {
          return status === 200;
        },
      };

      response = await lastValueFrom(
          this.httpService.request(axiosConfig).pipe(
              map((response) => {
                response["exception"] = "false";
                return response.data;
              }),
          ),
      );

    }
    catch( error ) {
      console.log(error.message);
      response = {
        "exception": "true",
        "message": error.message,
      }
    }
    return response;
  }

  private successResponse( data, message) {
    return {
      "status": "success",
      "message": message,
      "data": data,
    };
  }

  private failureResponse( message){
    return {
      "status": "failure",
      "message": message,
      "data": [],
    };
  }

}
