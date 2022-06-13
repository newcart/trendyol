import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  getHello(): string {
    return 'Trendyol Service is runing... Report from micrpservice by tcpip';
  }
  async testAccount(body): Promise<any> {
    const response = await this.sendToEndpoint('http://trendyol.com/');
    return response.toString();
  }

  async sendToEndpoint(endPoint): Promise<any> {
    const response = await this.httpService.post(endPoint).toPromise();
    return response.data;
  }

}
