import { TemplateData, EmailParams } from './i-send-email-service';
export type Sender = {
    email: string;
    name: string;
};
export type EmailPortParams<D extends TemplateData> = EmailParams<D> & {
    from: Sender;
};
export interface IEmailPort {
    send<D extends TemplateData>(params: EmailPortParams<D>): Promise<void>;
}
