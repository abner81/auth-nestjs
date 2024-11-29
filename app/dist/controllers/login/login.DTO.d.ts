import { UserProps } from 'domain/user';
export type LoginDTO = Pick<UserProps, 'email' | 'password'>;
