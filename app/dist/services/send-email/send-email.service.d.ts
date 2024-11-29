import { TemplateData, EmailParams, IEmailPort, ISendEmailService } from 'domain/use-cases/send-email';
import 'dotenv/config';
export declare class SendEmailService implements ISendEmailService {
    private readonly emailPort;
    constructor(emailPort: IEmailPort);
    send<D extends TemplateData>(params: EmailParams<D>): Promise<void>;
}
