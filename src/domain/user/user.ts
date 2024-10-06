import { Entity } from 'core/domain/entity';
import { Email, EmailProps, Password, PasswordProps } from './value-objects';
import {
  DateValueObject,
  EntityId,
  EntityIdProps,
  Name,
  NameProps,
} from 'domain/shared/value-objects';

export type UserProps = EmailProps &
  EntityIdProps &
  PasswordProps &
  NameProps & { createdAt: Date };

type UserState = {
  email: Email;
  createdAt: DateValueObject;
  id: EntityId;
  password: Password | null;
  name: Name;
};

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

  get password(): Password | null {
    return this.state.password;
  }

  private set password(value: Password | null) {
    this.state.password = value;
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

    return { email, id, createdAt, password, name };
  }

  export(): Required<UserProps> {
    return {
      ...this.state.email.export(),
      createdAt: this.state.createdAt.value,
      ...this.state.id.export(),
      ...this.state.password.export(),
      ...this.state.name.export(),
    };
  }
}
