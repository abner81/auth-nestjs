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
import * as ParseError from 'core/util/controller/parse-controller-error';

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

  const mockServiceReturnTo = (error: Exception) => {
    jest.spyOn(loginService, 'execute').mockImplementation(() => {
      throw error;
    });
  };

  const testControllerThrowReturn = async (error: Exception) => {
    const spy = jest.spyOn(ParseError, 'ParseControllerError');
    await loginController.create(dto, res);
    expect(spy).toHaveBeenCalledWith(error, res);
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
    const error = new DomainException('error');
    mockServiceReturnTo(error);
    await testControllerThrowReturn(error);
  });

  it('should return status 400 if LoginService throw OperationConflictException', async () => {
    const error = new OperationConflictException('errorMessage');
    mockServiceReturnTo(error);
    testControllerThrowReturn(error);
  });

  it('should return status 404 if LoginService throw NotFoundException', async () => {
    const error = new NotFoundException('errorMessage');
    mockServiceReturnTo(error);
    testControllerThrowReturn(error);
  });

  it('should return status 500 if LoginService throw InternalException', async () => {
    const error = new InternalException('errorMessage');
    mockServiceReturnTo(error);
    testControllerThrowReturn(error);
  });

  it('should return status 500 if LoginService throw unexpected error', async () => {
    const error = new ImATeapotException('errorMessage');
    mockServiceReturnTo(error);
    testControllerThrowReturn(error);
  });
});
