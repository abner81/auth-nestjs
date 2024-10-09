import { Test, TestingModule } from '@nestjs/testing';
import { EMAIL_PORT } from '../../constants';
import { Name } from 'domain/shared/value-objects';
import { EmailParams, Sender } from 'domain/use-cases/send-email';
import { Email } from 'domain/user/value-objects';
import { SendEmailService } from 'services/send-email';

export const makeModule: () => Promise<TestingModule> = async () => {
  return await Test.createTestingModule({
    providers: [
      SendEmailService,
      { provide: EMAIL_PORT, useValue: { send: jest.fn() } },
    ],
  }).compile();
};

export const params: EmailParams<object> = {
  html: '<h1>Olá! Seja bem-vindo.</h1>',
  subject: 'subject',
  to: [
    {
      email: new Email({ email: 'johndoe@gmail.com' }),
      name: new Name({ name: 'john doe' }),
    },
  ],
};

export const from: Sender = {
  email: process.env.EMAIL_FROM,
  name: 'Auth User Project',
};
