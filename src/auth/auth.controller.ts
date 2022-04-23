import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private auth_service: AuthService) {}

  @Post('sign-in')
  sign_in() {
    return this.auth_service.sign_in();
  }

  @Post('sign-up')
  sign_up(@Body() dto: AuthDto) {
    return this.auth_service.sign_up();
  }
}
