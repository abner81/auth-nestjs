import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventHandler } from 'core/events';
import { UserCreatedEvent } from 'domain/events/user';

@Injectable()
export class SendWelcomeEmailHandler implements EventHandler<UserCreatedEvent> {
  @OnEvent(UserCreatedEvent.name)
  async handle(event: UserCreatedEvent): Promise<void> {
    console.log('Opa! Renderizando o evento.');

    return;
  }
}
