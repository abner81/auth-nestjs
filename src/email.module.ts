import { Module } from '@nestjs/common';
import { EMAIL_PORT, SEND_EMAIL_SERVICE } from 'src/constants';
import { SendEmailService } from 'services/send-email';
import { MailerSendAdapter } from 'infra/email';

@Module({
  providers: [
    { provide: SEND_EMAIL_SERVICE, useClass: SendEmailService },
    { provide: EMAIL_PORT, useClass: MailerSendAdapter },
  ],
  exports: [SEND_EMAIL_SERVICE, EMAIL_PORT],
})
export class EmailModule {}
