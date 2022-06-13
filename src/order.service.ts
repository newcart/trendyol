import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {

  getOrder(body): string {
    return 'Hello World! Tendyol getPrder';
  }
}
