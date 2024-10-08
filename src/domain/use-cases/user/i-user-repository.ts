import { EntityId } from 'domain/shared/value-objects';
import { User } from 'domain/user';
import { Email } from 'domain/user/value-objects';

export interface IUserRepository {
  exists(email: Email): Promise<boolean>;
  create(user: User): Promise<void>;
  getById(id: EntityId): Promise<User>;
}
