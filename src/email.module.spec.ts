import { Test, TestingModule } from '@nestjs/testing';
import {
  EMAIL_PORT,
  EMAIL_SENDER_IMP,
  SEND_EMAIL_SERVICE,
} from 'src/constants';

import { EmailModule } from 'src/email.module';
import { SendEmailService } from 'services/send-email';
import { MailerSendAdapter } from 'infra/email';
import { MailerSend } from 'mailersend';

describe('Email Module', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [EmailModule],
    }).compile();
  });

  it('should load providers with success', () => {
    expect(module.get(SEND_EMAIL_SERVICE)).toBeInstanceOf(SendEmailService);
    expect(module.get(EMAIL_PORT)).toBeInstanceOf(MailerSendAdapter);
    expect(module.get(EMAIL_SENDER_IMP)).toBeInstanceOf(MailerSend);
  });
});
