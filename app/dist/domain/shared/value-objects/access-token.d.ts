import { ValueObject } from 'core/domain/value-object';
import { ImplementationException } from 'core/exceptions';
import 'dotenv/config';
export declare class JWTSecretNotExistsException extends ImplementationException {
    constructor();
}
export type AccessTokenProps = {
    accessToken: string;
};
export declare class AccessToken extends ValueObject<AccessTokenProps, string> {
    get value(): string;
    protected parse(props: AccessTokenProps): string;
    export(): Required<AccessTokenProps>;
}
