import { Name } from 'domain/shared/value-objects';
import { Email } from 'domain/user/value-objects';
type Receivers = {
    email: Email;
    name: Name;
};
type Personalization<P extends TemplateData> = {
    email: string;
    data: P;
};
export type EmailTags = 'welcome-email';
export type TemplateData<P extends object = object> = P;
export type EmailParams<D extends TemplateData> = {
    to: Receivers[];
    subject: string;
    html: string;
    personalization?: Personalization<D>[];
    tags?: EmailTags[];
};
export interface ISendEmailService {
    send<T extends TemplateData>(params: EmailParams<T>): Promise<void>;
}
export {};
