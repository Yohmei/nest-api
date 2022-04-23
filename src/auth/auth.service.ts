import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  sign_in() {
    return { message: 'signed in', success: true };
  }

  sign_up() {
    return { message: 'signed up', success: true };
  }
}
