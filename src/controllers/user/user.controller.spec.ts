import { UserService } from 'services/user/user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'domain/user';
import { CreateUserDTO } from './userDTO';
import { DomainException } from 'core/domain/exceptions';
import { USER_SERVICE } from '../../constants';
import { Response } from 'express';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;
  let res: any;

  const dto: CreateUserDTO = {
    email: 'mock@gmail.com',
    name: 'john doe',
    password: 'mypassword',
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
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
    res = mockResponse(); // Mock do response
  });

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
    const errorMessage = 'error_message';
    jest.spyOn(userService, 'create').mockImplementation(() => {
      throw new DomainException(errorMessage);
    });
    await userController.create(dto, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });
});
