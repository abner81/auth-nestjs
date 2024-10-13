import { IUseCase } from 'core/domain/i-use-case';
import { AccessToken } from 'domain/shared/value-objects';
import { Email, Password } from 'domain/user/value-objects';

export type IParams = {
  email: Email;
  password: Password;
};

export type IResponse = {
  accessToken: AccessToken;
};

export interface ILoginService extends IUseCase<IParams, IResponse> {}
