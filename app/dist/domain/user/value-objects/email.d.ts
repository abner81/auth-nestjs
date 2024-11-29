import { ValueObject } from 'core/domain/value-object';
export type EmailProps = {
    email: string;
};
export declare class Email extends ValueObject<EmailProps, string> {
    get value(): string;
    protected parse(props: EmailProps): string;
    export(): Required<EmailProps>;
}
