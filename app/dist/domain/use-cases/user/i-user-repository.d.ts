import { User } from 'domain/user';
import { Email } from 'domain/user/value-objects';
export interface IUserRepository {
    exists(email: Email): Promise<boolean>;
    create(user: User): Promise<void>;
    findByEmail(email: Email): Promise<User> | null;
}
