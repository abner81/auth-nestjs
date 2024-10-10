import { MailerSendAdapter } from './mailer-send.adapter';
import { MailerSend } from 'mailersend';
import { EMAIL_SENDER_IMP } from 'src/constants';
import * as mock from 'src/__mocks__/send-email/mailer-send-adapter.mock';
import 'dotenv/config';
import { UnexpectedException } from 'core/exceptions';

describe('Mailer Send Adapter', () => {
  let sutAdapter: MailerSendAdapter;
  let mailerSendImp: MailerSend;

  beforeEach(async () => {
    const module = await mock.buildModule();

    sutAdapter = module.get<MailerSendAdapter>(MailerSendAdapter);
    mailerSendImp = module.get<MailerSend>(EMAIL_SENDER_IMP);
  });

  it('should call MailerSend.send() with correct params', async () => {
    await sutAdapter.send<mock.ITemplateData>(mock.props);

    expect(mailerSendImp.email.send).toHaveBeenCalledTimes(2);

    mock.mailerSendParams.setTo(mock.getRecipientToIndex('0'));
    expect(mailerSendImp.email.send).toHaveBeenCalledWith(
      mock.mailerSendParams,
    );

    mock.mailerSendParams.setTo(mock.getRecipientToIndex('1'));
    expect(mailerSendImp.email.send).toHaveBeenCalledWith(
      mock.mailerSendParams,
    );
  });
});
