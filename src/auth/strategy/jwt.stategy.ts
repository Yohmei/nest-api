import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { get_key_pair } from '../../lib/jwt';
import { PrismaService } from './../../prisma/prisma.service';

interface JWTPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    const { pub_key } = get_key_pair();

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: pub_key,
    });

    this.prisma = prisma;
  }

  async validate(payload: JWTPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    delete user.hash;
    return user;
  }
}
