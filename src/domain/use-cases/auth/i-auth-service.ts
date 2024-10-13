import { AccessToken } from 'domain/shared/value-objects';
import { User } from 'domain/user';

export interface IAuthService {
  signInJWT(user: User): Promise<AccessToken>;
}

export type SignJWTPaylod = {
  id: string;
  email: string;
};
