import { SendEmailService } from './send-email.service';
import { EMAIL_PORT } from '../../constants';
import { IEmailPort } from 'domain/use-cases/send-email';
import * as mock from '__mocks__/send-email/send-email-service.mock';
import { UnexpectedException } from 'core/exceptions';

describe('Send Email Service', () => {
  let sendEmailService: SendEmailService;
  let emailPort: IEmailPort;

  beforeEach(async () => {
    const module = await mock.makeModule();
    sendEmailService = module.get<SendEmailService>(SendEmailService);
    emailPort = module.get<IEmailPort>(EMAIL_PORT);
  });

  it('should send email with success', () => {
    sendEmailService.send(mock.params);
    const from = mock.from;
    expect(emailPort.send).toHaveBeenCalledWith({ ...mock.params, from });
  });

  it('should throw error if EmailPort dispatch exception', async () => {
    jest.spyOn(emailPort, 'send').mockImplementation(() => {
      throw new UnexpectedException();
    });

    await expect(sendEmailService.send(mock.params)).rejects.toThrow(
      UnexpectedException,
    );
  });
});
