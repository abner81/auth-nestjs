import { ValueObject } from 'core/domain/value-object';
import { ImplementationException } from 'core/exceptions';
import { Guards } from 'core/guards';
import 'dotenv/config';

export class JWTSecretNotExistsException extends ImplementationException {
  constructor() {
    super('The environment variable: "JWT_SECRET" is empty');
  }
}

export type AccessTokenProps = {
  accessToken: string;
};

export class AccessToken extends ValueObject<AccessTokenProps, string> {
  get value(): string {
    return this.state;
  }

  protected parse(props: AccessTokenProps): string {
    const { accessToken } = props;

    Guards.againstNullOrUndefined(accessToken, 'AccessToken');
    Guards.ensureIsJwt(accessToken, 'AccessToken');

    if (!process.env.JWT_SECRET) throw new JWTSecretNotExistsException();
    return accessToken;
  }

  export(): Required<AccessTokenProps> {
    return { accessToken: this.state };
  }
}
