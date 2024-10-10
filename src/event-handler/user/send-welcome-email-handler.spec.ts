import { Test, TestingModule } from '@nestjs/testing';
import { SendWelcomeEmailHandler } from './send-welcome-email-handler';
import { userMock } from '__mocks__/user/user-mock';
import { UserCreatedEvent } from 'domain/events/user';
import {
  EMAIL_PORT,
  EMAIL_TEMPLATES_FOLDER,
  SEND_EMAIL_SERVICE,
} from 'src/constants';
import {
  EmailParams,
  IEmailPort,
  ISendEmailService,
} from 'domain/use-cases/send-email';
import { IWelcomeUserTemplate } from 'core/util/email-template/welcome/i-welcome-user-template';
import { getTemplate } from 'core/util/email-template/get-template';

describe('Send Welcome Email Handler', () => {
  let sutHandler: SendWelcomeEmailHandler;
  let sendEmailService: ISendEmailService;
  let emailAdapter: IEmailPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendWelcomeEmailHandler,
        { provide: SEND_EMAIL_SERVICE, useValue: { send: jest.fn() } },
        { provide: EMAIL_PORT, useValue: { send: jest.fn() } },
      ],
    }).compile();

    sutHandler = module.get<SendWelcomeEmailHandler>(SendWelcomeEmailHandler);
    sendEmailService = module.get<ISendEmailService>(SEND_EMAIL_SERVICE);
    emailAdapter = module.get<IEmailPort>(EMAIL_PORT);
  });

  it('should send Welcome Email with success', () => {
    sutHandler.handle(new UserCreatedEvent(userMock));
    const templatePath =
      EMAIL_TEMPLATES_FOLDER + '/welcome/welcome-user-template.html';
    const personalization = {
      email: userMock.email.value,
      data: { userName: userMock.name.value },
    };

    const callTo: EmailParams<IWelcomeUserTemplate> = {
      tags: ['welcome-email'],
      subject: 'Seja Bem-vindo',
      to: [{ email: userMock.email, name: userMock.name }],
      html: getTemplate(templatePath),
      personalization: [personalization],
    };
    expect(sendEmailService.send).toHaveBeenCalledWith(callTo);
  });
});
