import { PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mongodb+srv://nest-user:nest123@cluster0.oyp1x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        },
      },
    });
  }
}
