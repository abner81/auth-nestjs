import { User } from 'domain/user';
import { UserService } from './user.service';
import { IUserRepository } from 'domain/use-cases/user';
import { EntityId } from 'domain/shared/value-objects';
import { Email } from 'domain/user/value-objects';
import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from '../../constants';
import { UserRepository } from 'infra/user/user.repository';
import * as bcrypt from 'bcrypt';
import { OperationConflictException } from 'core/exceptions';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from 'core/domain/domain-event';
import { UserCreatedEvent } from 'domain/events/user';

describe('User Service', () => {
  let userRepository: IUserRepository;
  let userService: UserService;
  let eventEmitterMock: any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const hashSpy = jest.spyOn(bcrypt, 'hash');
  const hashedPassword =
    '$2a$10$3bSdCaOz5pHmtzRC3Oe8Uum1ZXTGH6zsje/Tg8MvdxIQF9xM8JwEa';
  hashSpy.mockImplementation(() => Promise.resolve(hashedPassword));

  const user = User.create({
    email: 'johndoe@gmail.com',
    name: 'john doe',
    password: 'my_password',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useClass: UserRepositoryMock,
        },
        {
          provide: EventEmitter2,
          useValue: { emit: jest.fn() },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(USER_REPOSITORY);
    userService = module.get<UserService>(UserService);
    eventEmitterMock = module.get<EventEmitter2>(EventEmitter2);
  });

  class UserRepositoryMock implements IUserRepository {
    exists(email: Email): Promise<boolean> {
      return Promise.resolve(false);
    }
    create(user: User): Promise<void> {
      return Promise.resolve();
    }
    findByEmail(email: Email): Promise<User> {
      throw Promise.resolve(user);
    }
  }

  it('should create User with success', async () => {
    const spyExists = jest.spyOn(userRepository, 'exists');
    const spySave = jest.spyOn(userRepository, 'create');
    const spyHash = jest.spyOn(user, 'hashPassword');
    const sut = await userService.create(user);

    expect(sut).toBeUndefined();
    expect(spyExists).toHaveBeenCalledWith(user.email);
    expect(spyHash).toHaveBeenCalled();
    expect(user.password.isHashed).toBeTruthy();
    expect(spySave).toHaveBeenCalledWith(user);
    expect(eventEmitterMock.emit).toHaveBeenCalledWith(
      UserCreatedEvent.name,
      new UserCreatedEvent(user),
    );
  });

  it('should throw error if email already exists', async () => {
    jest.spyOn(userRepository, 'exists').mockResolvedValue(true);
    const act = () => userService.create(user);
    await expect(act).rejects.toThrow(OperationConflictException);
    await expect(act).rejects.toThrow('E-mail já cadastrado.');
    expect(eventEmitterMock.emit).not.toHaveBeenCalled();
  });
});
