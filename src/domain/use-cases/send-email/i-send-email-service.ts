import { Name } from 'domain/shared/value-objects';
import { Email } from 'domain/user/value-objects';

type Receivers = { email: Email; name: Name };
type Personalization<P extends DataContent> = { email: string; data: P };

export type DataContent<P extends object = object> = P;

export type EmailParams<D extends DataContent> = {
  to: Receivers[];
  subject: string;
  html: string;
  personalization?: Personalization<D>[];
};

export interface ISendEmailService {
  send<D extends DataContent>(params: EmailParams<D>): Promise<void>;
}
