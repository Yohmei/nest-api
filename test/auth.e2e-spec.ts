import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { UserController } from './../src/user/user.controller';
import { delete_users_tests } from './tests/delete_users_tests';
import { signed_in_user_tests } from './tests/signed_in_user';
import { signed_out_user_tests } from './tests/signed_out_user';
import { sign_in_tests } from './tests/sign_in_tests';
import { sign_up_tests } from './tests/sign_up_tests';

interface IAuthTest {
  description: string;
  message: Object;
  status_code: number;
  expected_result: Object;
}

describe('AuthController (e2e)', () => {
  let app_url = 'localhost:2000';
  let access_token: String;

  for (let test_key of Object.keys(sign_up_tests)) {
    const test = sign_up_tests[test_key] as IAuthTest;

    it(test.description, (done) => {
      request(app_url)
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
      request(app_url)
        .post('/auth/sign-in')
        .send(test.message)
        .expect(test.status_code)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).toEqual(
            expect.objectContaining(test.expected_result),
          );

          if (test.expected_result.hasOwnProperty('access_token'))
            access_token = res.body.access_token;

          done();
        });
    });
  }

  for (let test_key of Object.keys(signed_in_user_tests)) {
    const test = signed_in_user_tests[test_key] as IAuthTest;

    it(test.description, (done) => {
      request(app_url)
        .get('/users/me')
        .set('Authorization', `Bearer ${access_token}`)
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
      request(app_url)
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

  for (let test_key of Object.keys(signed_out_user_tests)) {
    const test = signed_out_user_tests[test_key] as IAuthTest;

    it(test.description, (done) => {
      request(app_url)
        .get('/users/me')
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
});
