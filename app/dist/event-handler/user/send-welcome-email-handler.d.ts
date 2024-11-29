import { EventHandler } from 'core/events';
import { UserCreatedEvent } from 'domain/events/user';
import { ISendEmailService } from 'domain/use-cases/send-email';
export declare class SendWelcomeEmailHandler implements EventHandler<UserCreatedEvent> {
    private readonly emailService;
    constructor(emailService: ISendEmailService);
    handle(event: UserCreatedEvent): Promise<void>;
}
