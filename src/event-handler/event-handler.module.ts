import { Module } from '@nestjs/common';
import { SendWelcomeEmailHandler } from 'event-handler/user';
import { EmailModule } from '../email.module';

@Module({
  imports: [EmailModule],
  providers: [SendWelcomeEmailHandler],
})
export class EventHandlerModule {}
