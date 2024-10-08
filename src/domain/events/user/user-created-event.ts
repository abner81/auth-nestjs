import { DomainEvent } from 'core/domain/domain-event';
import { User } from 'domain/user';

export class UserCreatedEvent extends DomainEvent<User> {}
