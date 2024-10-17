import { Test, TestingModule } from '@nestjs/testing';
import { AUTH_SERVICE } from 'src/constants';
import { AuthModule } from 'src/auth.module';
import { AuthService } from 'services/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('Auth Module', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
  });

  it('should load providers with success', () => {
    expect(module.get(AUTH_SERVICE)).toBeInstanceOf(AuthService);
  });
});
