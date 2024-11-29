import { Entity } from 'core/domain/entity';
import { Email, EmailProps, Password, PasswordProps } from './value-objects';
import { AccessToken, DateValueObject, EntityId, EntityIdProps, Name, NameProps } from 'domain/shared/value-objects';
import { NotFoundException } from 'core/exceptions';
export type UserProps = EmailProps & EntityIdProps & PasswordProps & NameProps & {
    createdAt: Date;
    accessToken?: string;
};
type UserState = {
    email: Email;
    createdAt: DateValueObject;
    id: EntityId;
    password: Password | null;
    name: Name;
    accessToken: AccessToken | null;
};
export declare class UserNotFoundException extends NotFoundException {
    constructor();
}
export declare class User extends Entity<UserProps, UserState> {
    get email(): Email;
    get createdAt(): DateValueObject;
    get id(): EntityId;
    get name(): Name;
    get accessToken(): AccessToken | null;
    set accessToken(value: AccessToken);
    get password(): Password | null;
    private set password(value);
    hashPassword(): Promise<void>;
    comparePassword(toCompare: Password): Promise<boolean>;
    hidePassword(): void;
    static create(props: Omit<UserProps, 'id' | 'createdAt'>): User;
    protected parse(props: UserProps): UserState;
    export(): Required<UserProps>;
}
export {};
