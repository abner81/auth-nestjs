import { DomainException } from 'core/domain/exceptions';
import { ValueObject } from 'core/domain/value-object';
import { Guards } from 'core/guards';

export type PasswordProps = { password: string };

export class Password extends ValueObject<PasswordProps, string> {
  public static minLength = 10;

  get value(): string {
    return this.state;
  }

  get isHashed(): boolean {
    return this.isHash(this.value);
  }

  private isHash(password: string): boolean {
    const bcryptHashRegex = /^\$2[aby]\$\d{2}\$.{53}$/;
    return bcryptHashRegex.test(password);
  }

  private againstAppropriateLength(password: string) {
    if (!(password.length >= Password.minLength))
      throw new DomainException(
        'Password isnt contains a min length [8 chars min].',
      );
  }

  protected parse(props: PasswordProps): string {
    const { password } = props;

    Guards.againstNullOrUndefined(password, 'password');
    if (!this.isHash(password)) this.againstAppropriateLength(password);

    return password;
  }

  export(): Required<PasswordProps> {
    return { password: this.state };
  }
}
