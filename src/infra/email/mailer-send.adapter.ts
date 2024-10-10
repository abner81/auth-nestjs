import { Inject, Injectable } from '@nestjs/common';
import {
  TemplateData,
  EmailPortParams,
  IEmailPort,
} from 'domain/use-cases/send-email';
import {
  MailerSend as ImplementationClass,
  EmailParams,
  Sender,
  Recipient,
} from 'mailersend';
import 'dotenv/config';
import { EMAIL_SENDER_IMP } from 'src/constants';

@Injectable()
export class MailerSendAdapter implements IEmailPort {
  constructor(
    @Inject(EMAIL_SENDER_IMP)
    private readonly mailerSend: ImplementationClass,
  ) {}

  async send<D extends TemplateData>(props: EmailPortParams<D>): Promise<void> {
    const { from, html, subject, to, personalization, tags } = props;

    to.forEach(async (recipient) => {
      const emailParams = new EmailParams()
        .setFrom(new Sender(from.email, from.name))
        .setSubject(subject)
        .setHtml(html)
        .setTags(tags)
        .setTo([new Recipient(recipient.email.value, recipient.name.value)]);

      if (personalization) {
        emailParams.setPersonalization(personalization);
      }

      await this.mailerSend.email.send(emailParams);
    });
  }
}
