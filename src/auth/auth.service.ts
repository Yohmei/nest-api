import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  sign_in() {
    return { message: 'signed in', success: true };
  }

  sign_up() {
    return { message: 'signed up', success: true };
  }
}
