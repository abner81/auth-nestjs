import { DataContent, EmailParams } from './i-send-email-service';

export type Sender = {
  email: string;
  name: string;
};

export type EmailPortParams<D extends DataContent> = EmailParams<D> & {
  from: Sender;
};

export interface IEmailPort {
  send<D extends DataContent>(params: EmailPortParams<D>): Promise<void>;
}
