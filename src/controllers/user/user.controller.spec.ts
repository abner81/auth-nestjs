import { UserService } from 'services/user/user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserProps } from 'domain/user.domain';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;

  const userProps: UserProps = {
    createdAt: new Date(),
    email: 'mock@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    password: '1234',
  };
  const user = new User(userProps);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: { create: jest.fn().mockResolvedValue(user) },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return User agregate on success', async () => {
    const result = await userController.create(userProps);

    expect(userService.create).toHaveBeenCalledWith(user);
    expect(result).toBeInstanceOf(User);
    expect(result).toBe(user);
  });
});
