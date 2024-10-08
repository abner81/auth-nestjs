import { UserService } from 'services/user/user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'domain/user';
import { CreateUserDTO } from './userDTO';
import { DomainException } from 'core/domain/exceptions';
import { USER_SERVICE } from '../../constants';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;

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
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return User entity on success', async () => {
    const spy = jest.spyOn(userService, 'create');
    const result = await userController.create(dto);

    expect(spy).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should throw error if UserService return error', async () => {
    jest.spyOn(userService, 'create').mockImplementation(async () => {
      throw new DomainException('error_message');
    });

    await expect(userController.create(dto)).rejects.toThrow(DomainException);
    await expect(userController.create(dto)).rejects.toThrow('error_message');
  });

  it('should call User.create() with dto', async () => {
    const spy = jest.spyOn(User, 'create');
    await userController.create(dto);
    expect(spy).toHaveBeenCalledWith(dto);
  });

  it('should call UserService.create() with User Entity', async () => {
    const user = User.create(dto);
    jest.spyOn(User, 'create').mockImplementation(() => user);
    const spy = jest.spyOn(userService, 'create');

    await userController.create(dto);
    expect(spy).toHaveBeenCalledWith(user);
  });
});
