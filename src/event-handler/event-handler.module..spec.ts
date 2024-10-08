import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventHandlerModule } from './event-handler.module';
import { UserCreatedEvent } from 'domain/events/user';
import { SendWelcomeEmailHandler } from 'event-handler/user';
import { User } from 'domain/user';

describe('EventHandlerModule', () => {
  let eventEmitter: EventEmitter2;
  let sendWelcomeEmailHandler: SendWelcomeEmailHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventHandlerModule],
      providers: [EventEmitter2],
    }).compile();

    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    sendWelcomeEmailHandler = module.get<SendWelcomeEmailHandler>(
      SendWelcomeEmailHandler,
    );
  });

  it('deve espiar se o handler SendWelcomeEmailHandler foi chamado ao emitir UserCreatedEvent', () => {
    const user = User.create({
      email: 'johndoe@gmail.com',
      password: 'mypassword',
      name: 'john doe',
    });
    const spy = jest.spyOn(sendWelcomeEmailHandler, 'handle');
    const event = new UserCreatedEvent(user);
    eventEmitter.emit(UserCreatedEvent.name, event);

    expect(spy).toHaveBeenCalledWith(event);
  });
});
