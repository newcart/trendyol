import { Injectable, Catch } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class UtilService {
  private url = "https://api.trendyol.com/sapigw/";
  constructor(private httpService: HttpService) {}
  public convertProducts( data ){
    const result = {};
console.log(data);
    data['body']['products'].forEach(function(product) {
      var res = product.dataModels.map(function(o) {
        console.log(o)
      });
      console.log(res[0]);
    });
  }

  async sendToEndpoint(method, endPoint, requestData, data): Promise<any> {
    var response = {};

    try {
      const supplierId = data['seller_id'];
      const basicAuth = data['api_key'].toString('base64') + ':' + data['secret_key'].toString('base64');
      const headers =  {
        'Content-Type': 'application/json',
        "user-agent": supplierId + " - SelfIntegration",
        "Authorization": 'Basic ' + Buffer.from(basicAuth).toString('base64')
      }
      const url = this.url + endPoint;

      const axiosConfig: AxiosRequestConfig = {
        method: method,
        url: url,
        headers: headers,
        validateStatus: function (status: number) {
          return status === 200;
        },
        params:requestData
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

  public successResponse( data, message) {
    return {
      "status": "success",
      "message": message,
      "data": data,
    };
  }

  public failureResponse( message){
    return {
      "status": "failure",
      "message": message,
      "data": [],
    };
  }

}
