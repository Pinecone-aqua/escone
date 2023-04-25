import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'http://localhost:3030';
  }
}
