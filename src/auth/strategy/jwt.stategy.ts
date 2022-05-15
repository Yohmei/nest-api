import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { readFileSync } from 'fs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import gen_key_pair from '../../lib/jwt/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    let pub_key;

    try {
      pub_key = readFileSync(`${__dirname}/../../lib/jwt/id_rsa_pub.pem`);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes('no such file or directory')) gen_key_pair();
        else throw e;
        pub_key = readFileSync(`${__dirname}/../../lib/jwt/id_rsa_pub.pem`);
      }
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: pub_key,
    });
  }
}
