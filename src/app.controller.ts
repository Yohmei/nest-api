import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'fs';
import { AppService } from './app.service';
import gen_key_pair from './lib/jwt/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    try {
      readFileSync(`${__dirname}/../lib/jwt/id_rsa_pub.pem`);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes('no such file or directory')) gen_key_pair();
        else throw e;
      }
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
