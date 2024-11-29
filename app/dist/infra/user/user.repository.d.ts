import { User } from 'domain/user';
import { Email } from 'domain/user/value-objects';
import { IUserRepository } from 'domain/use-cases/user/i-user-repository';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserRepository implements IUserRepository {
    private readonly userRepo;
    constructor(userRepo: Repository<UserEntity>);
    exists(email: Email): Promise<boolean>;
    create(_user: User): Promise<void>;
    findByEmail(email: Email): Promise<User>;
}
