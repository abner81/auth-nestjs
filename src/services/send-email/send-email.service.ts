import { Inject, Injectable } from '@nestjs/common';
import { EMAIL_PORT } from '../../constants';
import {
  DataContent,
  EmailParams,
  IEmailPort,
  ISendEmailService,
  Sender,
} from 'domain/use-cases/send-email';
import 'dotenv/config';

@Injectable()
export class SendEmailService implements ISendEmailService {
  constructor(
    @Inject(EMAIL_PORT)
    private readonly emailPort: IEmailPort,
  ) {}

  async send<D extends DataContent>(params: EmailParams<D>): Promise<void> {
    const from: Sender = {
      email: process.env.EMAIL_FROM,
      name: 'Auth User Project',
    };

    return this.emailPort.send({ ...params, from });
  }
}
