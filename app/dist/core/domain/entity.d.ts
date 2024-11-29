import { DomainEvent } from './domain-event';
import { DomainObject } from './domain-object';
export declare abstract class Entity<TProps extends object, TState = Required<TProps>, TExport extends TProps = Required<TProps>> extends DomainObject<TProps, TState, TExport> {
    private _domainEvents;
    get domainEvents(): ReadonlyArray<DomainEvent<object>>;
    protected addDomainEvent<T extends object>(domainEvent: DomainEvent<T>): void;
    clone(): this;
}
