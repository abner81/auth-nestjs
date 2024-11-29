import { ValueObject } from 'core/domain/value-object';
import { UnauthorizedException } from 'core/exceptions';
export type PasswordProps = {
    password: string;
};
export declare class IncorrectPasswordException extends UnauthorizedException {
    constructor();
}
export declare class Password extends ValueObject<PasswordProps, string> {
    static minLength: number;
    get value(): string;
    get isHashed(): boolean;
    private isHash;
    private againstAppropriateLength;
    protected parse(props: PasswordProps): string;
    export(): Required<PasswordProps>;
}
