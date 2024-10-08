import { Module } from '@nestjs/common';
import { SendWelcomeEmailHandler } from 'event-handler/user';

@Module({
  providers: [SendWelcomeEmailHandler],
})
export class EventHandlerModule {}
