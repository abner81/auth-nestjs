import { Module } from '@nestjs/common';
import { USER_SERVICE, USER_REPOSITORY } from './constants';
import { UserController } from 'controllers/user/user.controller';
import { UserRepository } from 'infra/user/user.repository';
import { UserService } from 'services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'infra/user/user.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventHandlerModule } from 'event-handler/event-handler.module';
import * as dotenv from 'dotenv';
import { EmailModule } from 'src/email.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_URL,
      database: process.env.DB_DATABASE,
      ssl: true,
      autoLoadEntities: true,
      synchronize: true,
      entities: [UserEntity],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    EventEmitterModule.forRoot(),
    EventHandlerModule,
    EmailModule,
  ],
  controllers: [UserController],
  providers: [
    { provide: USER_SERVICE, useClass: UserService },
    { provide: USER_REPOSITORY, useClass: UserRepository },
    // { provide: SEND_EMAIL_SERVICE, useClass: SendEmailService },
    // { provide: EMAIL_PORT, useClass: MailerSendAdapter },
  ],
  exports: [USER_SERVICE, USER_REPOSITORY],
})
export class AppModule {}
