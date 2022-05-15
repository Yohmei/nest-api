import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JWTGuard } from './../auth/guards';
import { GetUser } from './../auth/decorator/get_user.decorator';
import { User } from '.prisma/client';

@UseGuards(JWTGuard)
@Controller('users')
export class UserController {
  @Get('me')
  get_me(@GetUser() user: User) {
    return user;
  }
}
