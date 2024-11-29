import { User } from 'domain/user';
import { IUserService } from '../../domain/use-cases/user/i-user-service';
import { IUserRepository } from 'domain/use-cases/user';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class UserService implements IUserService {
    private readonly userRepository;
    private readonly eventEmitter;
    constructor(userRepository: IUserRepository, eventEmitter: EventEmitter2);
    create(user: User): Promise<void>;
}
