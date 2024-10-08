import { User } from 'domain/user';

export interface IUserService {
  create(user: User): Promise<void>;
}
