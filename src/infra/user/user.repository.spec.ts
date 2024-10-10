import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { Email } from 'domain/user/value-objects';
import { userMock } from '__mocks__/user/user-mock';

describe('User Repository', () => {
  let sut: UserRepository;
  let typeOrmRepo: Repository<UserEntity>;
  let userEntity: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn().mockReturnValue(userMock),
            create: jest.fn().mockImplementation(() => {
              const entity = new UserEntity();
              const userExported = userMock.export();
              entity.createdAt = userExported.createdAt;
              entity.email = userExported.email;
              entity.id = userExported.id;
              entity.name = userExported.name;
              entity.password = userExported.password;

              userEntity = entity;
              return entity;
            }),
          },
        },
      ],
    }).compile();

    sut = module.get<UserRepository>(UserRepository);
    typeOrmRepo = module.get(getRepositoryToken(UserEntity));
  });

  describe('exists() method', () => {
    const email = new Email({ email: 'johndoe@gmail.com' });

    it('should call repo.findOne() with correct values', async () => {
      await sut.exists(email);
      expect(typeOrmRepo.findOne).toHaveBeenCalledWith({
        where: email.export(),
      });
    });
    it('should return true if exists user', async () => {
      const result = await sut.exists(email);
      expect(result).toBeTruthy();
    });
    it('should return false if not exists user', async () => {
      jest
        .spyOn(typeOrmRepo, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));
      const result = await sut.exists(email);
      expect(result).toBeFalsy();
    });
  });

  describe('create() method', () => {
    it('should call repo.create() and repo.save() with correct values', async () => {
      await sut.create(userMock);
      expect(typeOrmRepo.create).toHaveBeenCalledWith(userMock.export());
      expect(typeOrmRepo.save).toHaveBeenCalledWith(userEntity);
    });
  });
});
