import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'KODE / LUMEN Labs API',
      status: 'ok',
      version: '0.1.0',
    };
  }
}
