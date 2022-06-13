import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {

  getProduct(body): string {
    return 'Hello World! Tendyol getProduct';
  }
}
