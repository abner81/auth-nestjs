import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { userMock } from '__mocks__/user/user-mock';
import { AccessToken } from 'domain/shared/value-objects';
import { Exception } from 'core/exceptions';

describe('Auth Service', () => {
  const returnedToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvbiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { signAsync: jest.fn().mockReturnValue(returnedToken) },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signInJWT()', () => {
    it('should return a valid accessToken on success', async () => {
      const result = await authService.signInJWT(userMock);
      expect(result).toStrictEqual(
        new AccessToken({ accessToken: returnedToken }),
      );
    });

    it('should call jetService.signAsync() with correct payload', async () => {
      const signAsyncSpy = jest.spyOn(jwtService, 'signAsync');
      await authService.signInJWT(userMock);

      expect(signAsyncSpy).toHaveBeenCalledWith({
        id: userMock.id.value,
        email: userMock.email.value,
      });
    });

    it('should return error if JwtService throw error', async () => {
      jest
        .spyOn(jwtService, 'signAsync')
        .mockImplementation(() => Promise.reject(new Exception()));
      const act = async () => await authService.signInJWT(userMock);

      expect(act).rejects.toThrow(Exception);
    });
  });
});
