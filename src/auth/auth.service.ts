import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { readFileSync } from 'fs';
import { PrismaService } from './../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async sign_in(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pw_match = await argon.verify(user.hash, dto.password);

    if (!pw_match) throw new ForbiddenException('Credentials incorrect');

    return this.sign_token(user.id, user.email);
  }

  async sign_up(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash },
      });

      return this.sign_token(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials already taken');
        else throw error;
    }
  }

  async delete_users(email: string) {
    const deleted_user = await this.prisma.user.deleteMany({
      where: {
        email: {
          contains: email,
        },
      },
    });

    return deleted_user;
  }

  async sign_token(user_id: string, email: string) {
    const payload = {
      sub: user_id,
      email,
    };

    const priv_key = readFileSync(`${__dirname}/../lib/jwt/id_rsa_priv.pem`);

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      privateKey: priv_key.toString(),
    });

    return { access_token: token };
  }
}
