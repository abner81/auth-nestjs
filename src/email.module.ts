import { Module } from '@nestjs/common';
import {
  EMAIL_PORT,
  EMAIL_SENDER_IMP,
  SEND_EMAIL_SERVICE,
} from 'src/constants';
import { SendEmailService } from 'services/send-email';
import { MailerSendAdapter } from 'infra/email';
import { MailerSend } from 'mailersend';
import 'dotenv/config';

@Module({
  providers: [
    { provide: SEND_EMAIL_SERVICE, useClass: SendEmailService },
    { provide: EMAIL_PORT, useClass: MailerSendAdapter },
    {
      provide: EMAIL_SENDER_IMP,
      useFactory: () => new MailerSend({ apiKey: process.env.EMAIL_API_TOKEN }),
    },
  ],
  exports: [SEND_EMAIL_SERVICE, EMAIL_PORT, EMAIL_SENDER_IMP],
})
export class EmailModule {}
