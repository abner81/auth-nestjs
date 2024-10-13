import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'domain/shared/value-objects';
import { IAuthService, SignJWTPaylod } from 'domain/use-cases/auth';
import { User } from 'domain/user';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signInJWT(user: User): Promise<AccessToken> {
    const payload: SignJWTPaylod = {
      id: user.id.value,
      email: user.email.value,
    };

    const token = await this.jwtService.signAsync(payload);
    return new AccessToken({ accessToken: token });
  }
}
