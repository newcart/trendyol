import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  testAccount(body): string {
    return 'Hello World! Tendyol testAccount';
  }
}
