import { Entity } from 'core/domain/entity';
import { Email, EmailProps, Password, PasswordProps } from './value-objects';
import {
  AccessToken,
  DateValueObject,
  EntityId,
  EntityIdProps,
  Name,
  NameProps,
} from 'domain/shared/value-objects';
import * as bcrypt from 'bcrypt';
import { Exception, NotFoundException } from 'core/exceptions';

export type UserProps = EmailProps &
  EntityIdProps &
  PasswordProps &
  NameProps & { createdAt: Date; accessToken?: string };

type UserState = {
  email: Email;
  createdAt: DateValueObject;
  id: EntityId;
  password: Password | null;
  name: Name;
  accessToken: AccessToken | null;
};

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('Usuário não encontrado.');
  }
}

export class User extends Entity<UserProps, UserState> {
  get email() {
    return this.state.email;
  }

  get createdAt() {
    return this.state.createdAt;
  }

  get id() {
    return this.state.id;
  }

  get name(): Name {
    return this.state.name;
  }

  get accessToken(): AccessToken | null {
    return this.state.accessToken;
  }
  public set accessToken(value: AccessToken) {
    this.state.accessToken = value;
  }

  get password(): Password | null {
    return this.state.password;
  }

  private set password(value: Password | null) {
    this.state.password = value;
  }

  public async hashPassword(): Promise<void> {
    const hash = await bcrypt.hash(this.password.value, 10);
    this.password = new Password({ password: hash });
  }

  public async comparePassword(toCompare: Password): Promise<boolean> {
    if (this.password.isHashed)
      return await bcrypt.compare(toCompare.value, this.password.value);
    else return this.password.equals(toCompare);
  }

  public hidePassword() {
    this.password = null;
  }

  static create(props: Omit<UserProps, 'id' | 'createdAt'>) {
    const id = EntityId.create();
    const createdAt = DateValueObject.create();

    return new User({ ...props, id: id.value, createdAt: createdAt.value });
  }

  protected parse(props: UserProps): UserState {
    const email = new Email(props);
    const id = new EntityId(props);
    const createdAt = new DateValueObject({ date: props.createdAt });

    const password = new Password(props);
    const name = new Name(props);
    const accessToken = props.accessToken
      ? new AccessToken({ accessToken: props.accessToken })
      : null;

    return { email, id, createdAt, password, name, accessToken };
  }

  export(): Required<UserProps> {
    return {
      ...this.state.email.export(),
      createdAt: this.state.createdAt.value,
      ...this.state.id.export(),
      ...this.state.password.export(),
      ...this.state.name.export(),
      accessToken: this.state.accessToken?.value ?? null,
    };
  }
}
