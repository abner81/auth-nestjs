import { Test, TestingModule } from '@nestjs/testing';
import { LOGIN_SERVICE, USER_REPOSITORY, USER_SERVICE } from 'src/constants';
import { LoginController } from 'controllers/login/login.controller';
import { UserController } from 'controllers/user/user.controller';
import { UserRepository } from 'infra/user/user.repository';
import { LoginService } from 'services/login/login.service';
import { UserService } from 'services/user/user.service';
import { AppModule } from 'src/app.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth.module';
import { EmailModule } from 'src/email.module';
import { EventHandlerModule } from 'event-handler/event-handler.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserEntity } from 'infra/user/user.entity';
import 'dotenv/config';

describe('App Module', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(TypeOrmModule)
      .useValue({
        initialize: jest.fn().mockResolvedValue({}),
        destroy: jest.fn().mockResolvedValue({}),
        isInitialized: true,
      })
      .compile();
  });

  it('should load Controllers with success', () => {
    expect(module.get(UserController)).toBeInstanceOf(UserController);
    expect(module.get(LoginController)).toBeInstanceOf(LoginController);
  });

  it('should load providers with success', () => {
    expect(module.get(USER_SERVICE)).toBeInstanceOf(UserService);
    expect(module.get(USER_REPOSITORY)).toBeInstanceOf(UserRepository);
    expect(module.get(LOGIN_SERVICE)).toBeInstanceOf(LoginService);
  });

  it('should load imports with success', () => {
    expect(module.get(AuthModule)).toBeInstanceOf(AuthModule);
    expect(module.get(EmailModule)).toBeInstanceOf(EmailModule);
    expect(module.get(EventHandlerModule)).toBeInstanceOf(EventHandlerModule);
    expect(module.get(EventEmitterModule)).toBeInstanceOf(EventEmitterModule);
    expect(getRepositoryToken(UserEntity)).toBe('UserEntityRepository');
  });
});
