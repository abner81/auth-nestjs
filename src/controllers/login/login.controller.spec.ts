import { Test, TestingModule } from '@nestjs/testing';
import { DomainException } from 'core/domain/exceptions';
import { LOGIN_SERVICE } from '../../constants';
import {
  Exception,
  InternalException,
  NotFoundException,
  OperationConflictException,
} from 'core/exceptions';
import { ImATeapotException } from '@nestjs/common';
import { mockResponse } from '__mocks__/http-response-mock';
import { LoginController } from './login.controller';
import { LoginService } from 'services/login/login.service';
import { LoginDTO } from './login.DTO';
import { AccessToken } from 'domain/shared/value-objects';
import { Email, Password } from 'domain/user/value-objects';

describe('User Controller', () => {
  let loginController: LoginController;
  let loginService: LoginService;
  let res: any;

  const dto: LoginDTO = {
    email: 'mock@gmail.com',
    password: 'mypassword',
  };
  const errorMessage = 'error_message';

  const accessToken = new AccessToken({
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvbiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LOGIN_SERVICE,
          useValue: {
            execute: jest.fn().mockReturnValue({ accessToken }),
          },
        },
      ],
    }).compile();

    loginController = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LOGIN_SERVICE);
    res = mockResponse();
    jest.clearAllMocks();
  });

  const mockServiceReturnTo = (exception: typeof Exception) => {
    jest.spyOn(loginService, 'execute').mockImplementation(() => {
      throw new exception(errorMessage);
    });
  };

  const testControllerReturn = async (status: number) => {
    await loginController.create(dto, res);
    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  };

  it('should be defined', () => {
    expect(loginController).toBeDefined();
    expect(loginService).toBeDefined();
  });

  it('should Login user with success, return status 200 and { accessToken }', async () => {
    await loginController.create(dto, res);
    const email = new Email({ email: dto.email });
    const password = new Password({ password: dto.password });

    expect(loginService.execute).toHaveBeenCalledWith({ email, password });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(accessToken.export());
  });

  it('should return status 400 if LoginService throw DomainException', async () => {
    mockServiceReturnTo(DomainException);
    await testControllerReturn(400);
  });

  it('should return status 400 if LoginService throw OperationConflictException', async () => {
    mockServiceReturnTo(OperationConflictException);
    await testControllerReturn(409);
  });

  it('should return status 404 if LoginService throw NotFoundException', async () => {
    mockServiceReturnTo(NotFoundException);
    await testControllerReturn(404);
  });

  it('should return status 500 if LoginService throw InternalException', async () => {
    mockServiceReturnTo(InternalException);
    await testControllerReturn(500);
  });

  it('should return status 500 if LoginService throw unexpected error', async () => {
    mockServiceReturnTo(ImATeapotException);
    await testControllerReturn(500);
  });
});
