import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app_url = 'localhost:2000';

  it('/ (GET)', () => {
    return request(app_url).get('/').expect(200).expect('Hello World!');
  });
});
