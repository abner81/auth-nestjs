export declare abstract class DomainObject<TProps extends object, TState = Required<TProps>, TExport extends TProps = Required<TProps>> {
    private _state;
    protected get state(): TState;
    constructor(props: TProps);
    protected abstract parse(props: TProps): TState;
    abstract export(): TExport;
    toString(): string;
    toJSON(): TExport;
    protected parseAndStore(props: TProps): void;
}
