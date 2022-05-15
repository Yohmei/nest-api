import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { get_key_pair } from '../lib/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        const { priv_key, pub_key } = get_key_pair();
        const options: JwtModuleOptions = {
          privateKey: priv_key,
          publicKey: pub_key,
          signOptions: {
            expiresIn: '15m',
            algorithm: 'RS256',
          },
        };
        return options;
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
