import { ValueObject } from 'core/domain/value-object';
export type EntityIdProps = {
    id: string;
};
export declare class EntityId extends ValueObject<EntityIdProps, string> {
    get value(): string;
    protected parse(props: EntityIdProps): string;
    static create(): EntityId;
    export(): Required<EntityIdProps>;
}
