import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth_service: AuthService) {}

  @Post('sign-in')
  sign_in() {
    return this.auth_service.sign_in();
  }

  @Post('sign-up')
  sign_up() {
    return this.auth_service.sign_up();
  }
}
