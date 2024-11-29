import { Inject, Injectable } from '@nestjs/common';
import { User } from 'domain/user';
import { IUserService } from '../../domain/use-cases/user/i-user-service';
import { IUserRepository } from 'domain/use-cases/user';
import { USER_REPOSITORY } from '../../constants';
import { OperationConflictException } from 'core/exceptions';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'domain/events/user';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(user: User): Promise<void> {
    const alreadyExists = await this.userRepository.exists(user.email);
    if (alreadyExists)
      throw new OperationConflictException('E-mail já cadastrado.');

    await user.hashPassword();
    this.userRepository.create(user);
    console.log('criado');

    // this.eventEmitter.emit(UserCreatedEvent.name, new UserCreatedEvent(user));
  }
}
