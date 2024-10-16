import { IUserRepository } from 'domain/use-cases/user';
import { LoginService } from './login.service';
import { IAuthService } from 'domain/use-cases/auth';
import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY, AUTH_SERVICE } from 'src/constants';
import { AccessToken } from 'domain/shared/value-objects';
import { IParams } from 'domain/use-cases/login';
import {
  Email,
  IncorrectPasswordException,
  Password,
} from 'domain/user/value-objects';
import { User, UserNotFoundException } from 'domain/user';
import { userMock } from '__mocks__/user/user-mock';
import { UnexpectedException } from 'core/exceptions';

describe('Login Service', () => {
  let loginService: LoginService;
  let userRepo: IUserRepository;
  let authService: IAuthService;

  const accessToken = new AccessToken({
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvbiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  });
  const sutParams: IParams = {
    email: userMock.email,
    password: userMock.password,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: USER_REPOSITORY,
          useValue: { findByEmail: jest.fn().mockReturnValue(userMock) },
        },
        {
          provide: AUTH_SERVICE,
          useValue: {
            signInJWT: jest.fn().mockReturnValue(accessToken),
          },
        },
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
    userRepo = module.get<IUserRepository>(USER_REPOSITORY);
    authService = module.get<IAuthService>(AUTH_SERVICE);
    jest.clearAllMocks();
  });

  it('should return {accessToken} if user LoggedIn with success', async () => {
    const result = await loginService.execute(sutParams);
    expect(result).toStrictEqual({ accessToken });
  });

  it('should call get and validation methods()', async () => {
    const repoSpy = jest.spyOn(userRepo, 'findByEmail');
    const comparePasswordSpy = jest.spyOn(userMock, 'comparePassword');
    const signInJWTSpy = jest.spyOn(authService, 'signInJWT');
    await loginService.execute(sutParams);

    expect(repoSpy).toHaveBeenCalledWith(sutParams.email);
    expect(comparePasswordSpy).toHaveBeenCalledWith(sutParams.password);
    expect(signInJWTSpy).toHaveBeenCalledWith(userMock);
  });

  it('should throw error if user not found', async () => {
    jest.spyOn(userRepo, 'findByEmail').mockReturnValue(null);
    const act = () => loginService.execute(sutParams);

    expect(act).rejects.toThrow(UserNotFoundException);
  });

  it('should throw error if incorrect password', async () => {
    jest
      .spyOn(userMock, 'comparePassword')
      .mockReturnValue(Promise.resolve(false));
    const act = () => loginService.execute(sutParams);

    expect(act).rejects.toThrow(IncorrectPasswordException);
  });
});
