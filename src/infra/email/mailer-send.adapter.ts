import { Injectable } from '@nestjs/common';
import {
  DataContent,
  EmailPortParams,
  IEmailPort,
} from 'domain/use-cases/send-email';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import 'dotenv/config';

@Injectable()
export class MailerSendAdapter implements IEmailPort {
  async send<D extends DataContent>(props: EmailPortParams<D>): Promise<void> {
    const { from, html, subject, to, personalization } = props;

    const mailerSend = new MailerSend({
      apiKey: process.env.EMAIL_API_TOKEN,
    });

    const emailParams = new EmailParams()
      //   .setFrom(new Sender(from.email, from.name))
      .setSubject(subject)
      .setHtml(html)
      .setTo(
        to.map(({ email, name }) => new Recipient(email.value, name.value)),
      );

    if (personalization) {
      emailParams.setPersonalization(personalization);
    }

    console.log(mailerSend);

    await mailerSend.email.send(emailParams);
  }
}
