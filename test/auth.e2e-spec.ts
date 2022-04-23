import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../src/auth/auth.module';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/sign-in (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-in')
      .expect(201)
      .expect({ message: 'signed in', success: true });
  });

  it('/auth/sign-up (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .expect(201)
      .expect({ message: 'signed up', success: true });
  });
});
