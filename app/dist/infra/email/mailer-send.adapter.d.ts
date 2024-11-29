import { TemplateData, EmailPortParams, IEmailPort } from 'domain/use-cases/send-email';
import { MailerSend as ImplementationClass } from 'mailersend';
import 'dotenv/config';
export declare class MailerSendAdapter implements IEmailPort {
    private readonly mailerSend;
    constructor(mailerSend: ImplementationClass);
    send<D extends TemplateData>(props: EmailPortParams<D>): Promise<void>;
}
