import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { UserController } from 'controllers/user/user.controller';
import { USER_REPOSITORY, USER_SERVICE } from './constants';
import { UserService } from 'services/user/user.service';
import { UserRepository } from 'infra/user/user.repository';

describe('App Module', () => {
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should App Module is defined', () => {
    expect(module).toBeDefined();
  });

  it('should inject Service and Repository correctly', () => {
    expect(module.get(UserController)).toBeInstanceOf(UserController);
    expect(module.get(USER_SERVICE)).toBeInstanceOf(UserService);
    expect(module.get(USER_REPOSITORY)).toBeInstanceOf(UserRepository);
  });
});
