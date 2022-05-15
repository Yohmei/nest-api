import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'fs';
import { AppService } from './app.service';
import gen_key_pair from './lib/jwt/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
