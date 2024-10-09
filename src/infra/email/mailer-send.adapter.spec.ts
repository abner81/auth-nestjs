import { Email } from 'domain/user/value-objects';
import { MailerSendAdapter } from './mailer-send.adapter';
import { Name } from 'domain/shared/value-objects';
import 'dotenv/config';

describe('first', () => {
  it('should ', async () => {
    const mailerAdapter = new MailerSendAdapter();
    console.log(process.env.EMAIL_FROM);

    await mailerAdapter.send({
      from: { email: process.env.EMAIL_FROM, name: 'Auth Project' },
      html: '<h1>Ola, meu conteudo aqui.</h1>',
      subject: 'Seja bem-vindo',
      to: [
        {
          email: new Email({ email: 'abnermachado1@gmail.com' }),
          name: new Name({ name: 'Abner Machado' }),
        },
      ],
    });
  });
});
