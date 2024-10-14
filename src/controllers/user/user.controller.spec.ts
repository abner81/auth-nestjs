import { UserService } from 'services/user/user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'domain/user';
import { CreateUserDTO } from './user.DTO';
import { DomainException } from 'core/domain/exceptions';
import { USER_SERVICE } from '../../constants';
import {
  Exception,
  InternalException,
  NotFoundException,
  OperationConflictException,
} from 'core/exceptions';
import { ImATeapotException } from '@nestjs/common';
import { mockResponse } from '__mocks__/http-response-mock';
import * as ParseError from 'core/util/controller/parse-controller-error';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;
  let res: any;

  const dto: CreateUserDTO = {
    email: 'mock@gmail.com',
    name: 'john doe',
    password: 'mypassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: USER_SERVICE,
          useValue: { create: jest.fn().mockReturnValue(Promise.resolve()) },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(USER_SERVICE);
    res = mockResponse();
    jest.clearAllMocks();
  });

  const mockServiceReturnTo = (error: Exception) => {
    jest.spyOn(userService, 'create').mockImplementation(() => {
      throw error;
    });
  };

  const testControllerThrowReturn = async (error: Exception) => {
    const spy = jest.spyOn(ParseError, 'ParseControllerError');
    await userController.create(dto, res);
    expect(spy).toHaveBeenCalledWith(error, res);
  };

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return User entity on success and return status 201', async () => {
    const user = User.create(dto);
    const service = jest.spyOn(userService, 'create');
    const userCreate = jest.spyOn(User, 'create');
    userCreate.mockImplementation(() => user);
    await userController.create(dto, res);

    expect(service).toHaveBeenCalledWith(user);
    expect(userCreate).toHaveBeenCalledWith(dto);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalled();
  });

  it('should throw error if UserService return status 400', async () => {
    const error = new DomainException('errorMessage');
    mockServiceReturnTo(error);
    testControllerThrowReturn(error);
  });

  it('should throw error if UserService return status 409', async () => {
    const error = new OperationConflictException('errorMessage');
    mockServiceReturnTo(error);
    testControllerThrowReturn(error);
  });

  it('should throw error if UserService return status 404', async () => {
    const error = new NotFoundException('errorMessage');
    mockServiceReturnTo(error);
    testControllerThrowReturn(error);
  });

  it('should throw error if UserService return status 500', async () => {
    const error = new InternalException('errorMessage');
    mockServiceReturnTo(error);
    testControllerThrowReturn(error);
  });

  it('should return status 500 if Service throw unknown error', async () => {
    const error = new ImATeapotException('errorMessage');
    mockServiceReturnTo(error);
    testControllerThrowReturn(error);
  });
});
