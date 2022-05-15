import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private auth_service: AuthService) {}

  @Post('sign-in')
  sign_in(@Body() dto: AuthDto) {
    return this.auth_service.sign_in(dto);
  }

  @Post('sign-up')
  sign_up(@Body() dto: AuthDto) {
    return this.auth_service.sign_up(dto);
  }

  @Post('delete-users')
  delete_users(@Body() { email }: { email: string }) {
    return this.auth_service.delete_users(email);
  }
}
