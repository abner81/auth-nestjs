import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SERVICE } from 'src/constants';
import { AuthService } from 'services/auth/auth.service';
import 'dotenv/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [{ provide: AUTH_SERVICE, useClass: AuthService }],
  exports: [AuthService],
})
export class AuthModule {}
