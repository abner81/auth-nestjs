import { UserProps } from 'domain/user';

export type CreateUserDTO = Pick<UserProps, 'email' | 'name' | 'password'>;
