import { DomainException } from 'core/domain/exceptions';
import { ValueObject } from 'core/domain/value-object';
export declare class InvalidNameException extends DomainException {
    constructor();
}
export type NameProps = {
    name: string;
};
export declare class Name extends ValueObject<NameProps, string> {
    static minWords: number;
    get value(): string;
    get firstName(): string;
    get lastName(): string;
    private capitalizeName;
    protected parse(props: NameProps): string;
    export(): Required<NameProps>;
}
