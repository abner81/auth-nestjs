import { Test, TestingModule } from '@nestjs/testing';
import { EMAIL_SENDER_IMP } from 'src/constants';
import { MailerSendAdapter } from 'infra/email';
import { EmailPortParams } from 'domain/use-cases/send-email';
import { Email } from 'domain/user/value-objects';
import { Name } from 'domain/shared/value-objects';
import { EmailParams, Sender } from 'mailersend';

export const buildModule = async (): Promise<TestingModule> =>
  await Test.createTestingModule({
    providers: [
      MailerSendAdapter,
      {
        provide: EMAIL_SENDER_IMP,
        useValue: { email: { send: jest.fn() } },
      },
    ],
  }).compile();

export type ITemplateData = { name: string };
export const props: EmailPortParams<ITemplateData> = {
  from: {
    email: process.env.EMAIL_FROM,
    name: 'Auth Project',
  },
  html: '<h1>Ola, meu conteudo aqui.</h1>',
  subject: 'Seja bem-vindo',
  tags: ['welcome-email'],
  to: [
    {
      email: new Email({ email: 'abner81@live.com' }),
      name: new Name({ name: 'Abner Machado' }),
    },
    {
      email: new Email({ email: 'abnermachado1@gmail.com' }),
      name: new Name({ name: 'Abner Machado' }),
    },
  ],
  personalization: [{ email: 'abner81@live.com', data: { name: 'john doe' } }],
};

export const mailerSendParams = new EmailParams()
  .setFrom(new Sender(props.from.email, props.from.name))
  .setSubject(props.subject)
  .setHtml(props.html)
  .setTags(props.tags)
  .setPersonalization(props.personalization);

export const getRecipientToIndex = (index: '0' | '1') => {
  return [
    {
      email: props.to[index].email.value,
      name: props.to[index].name.value,
    },
  ];
};
