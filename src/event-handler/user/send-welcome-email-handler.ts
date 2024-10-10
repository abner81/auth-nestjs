import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EMAIL_TEMPLATES_FOLDER, SEND_EMAIL_SERVICE } from '../../constants';
import { EventHandler } from 'core/events';
import { UserCreatedEvent } from 'domain/events/user';
import { ISendEmailService } from 'domain/use-cases/send-email';
import { IWelcomeUserTemplate } from 'core/util/email-template/welcome/i-welcome-user-template';
import { getTemplate } from 'core/util/email-template/get-template';
import * as path from 'path';

@Injectable()
export class SendWelcomeEmailHandler implements EventHandler<UserCreatedEvent> {
  constructor(
    @Inject(SEND_EMAIL_SERVICE)
    private readonly emailService: ISendEmailService,
  ) {}

  @OnEvent(UserCreatedEvent.name)
  async handle(event: UserCreatedEvent): Promise<void> {
    const user = event.payload;
    const templatePath = path.join(
      EMAIL_TEMPLATES_FOLDER,
      'welcome',
      'welcome-user-template.html',
    );

    const welcomeTemplate = getTemplate(templatePath);

    await this.emailService.send<IWelcomeUserTemplate>({
      tags: ['welcome-email'],
      subject: 'Seja Bem-vindo',
      to: [{ email: user.email, name: user.name }],
      html: welcomeTemplate,
      personalization: [
        { email: user.email.value, data: { userName: user.name.firstName } },
      ],
    });
  }
}
