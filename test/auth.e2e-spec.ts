import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { delete_users_tests } from './test_data/delete_users_tests';
import { sign_in_tests } from './test_data/sign_in_tests';
import { sign_up_tests } from './test_data/sign_up_tests';

interface IAuthTest {
  description: string;
  message: Object;
  status_code: number;
  expected_result: Object;
}

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        PrismaModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  for (let test_key of Object.keys(sign_up_tests)) {
    const test = sign_up_tests[test_key] as IAuthTest;

    it(test.description, (done) => {
      request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(test.message)
        .expect(test.status_code)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual(
            expect.objectContaining(test.expected_result),
          );
          done();
        });
    });
  }

  for (let test_key of Object.keys(sign_in_tests)) {
    const test = sign_in_tests[test_key] as IAuthTest;

    it(test.description, (done) => {
      request(app.getHttpServer())
        .post('/auth/sign-in')
        .send(test.message)
        .expect(test.status_code)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual(
            expect.objectContaining(test.expected_result),
          );
          done();
        });
    });
  }

  for (let test_key of Object.keys(delete_users_tests)) {
    const test = delete_users_tests[test_key] as IAuthTest;

    it(test.description, (done) => {
      request(app.getHttpServer())
        .post('/auth/delete-users')
        .send(test.message)
        .expect(test.status_code)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual(
            expect.objectContaining(test.expected_result),
          );
          done();
        });
    });
  }

  afterEach(async () => {
    await app.close();
  });
});
