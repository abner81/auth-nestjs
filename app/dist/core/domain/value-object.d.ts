import { DomainObject } from './domain-object';
import { IEquals } from './i-equal';
export declare abstract class ValueObject<TProps extends object, TState = Required<TProps>, TExport extends TProps = Required<TProps>> extends DomainObject<TProps, TState, TExport> implements IEquals {
    protected get state(): Readonly<TState>;
    equals(other: unknown): other is this;
    protected parseAndStore(props: TProps): void;
}
