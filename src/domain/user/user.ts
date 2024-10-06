import { Entity } from 'core/domain/entity';
import { DateValueObject } from 'domain/date-value-object';
import { EntityId, EntityIdProps } from 'domain/entity-id';
import { Email, EmailProps, Password, PasswordProps } from './value-objects';

export type UserProps = EmailProps &
  EntityIdProps &
  PasswordProps & { createdAt: Date };

type UserState = {
  email: Email;
  createdAt: DateValueObject;
  id: EntityId;
  password: Password | null;
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

    return { email, id, createdAt, password };
  }

  export(): Required<UserProps> {
    return {
      ...this.state.email.export(),
      createdAt: this.state.createdAt.value,
      ...this.state.id.export(),
      ...this.state.password.export(),
    };
  }
}
