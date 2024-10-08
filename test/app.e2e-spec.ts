import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getConnection } from 'typeorm';
import { UserEntity } from 'infra/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => ({
            type: 'mongodb',
            url: mongoUri,
            synchronize: true, // Para criar o esquema de banco de dados automaticamente
            entities: [UserEntity], // Adicione suas entidades aqui
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();

    // Aqui você deve configurar o TypeORM para usar a URI do MongoDB na memória
    await app.init();
  });

  afterAll(async () => {
    await mongoServer.stop();
    await app.close();
  });

  it('/ (GET)', () => {
    request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'john doe',
        email: 'johndoe2@gmail.com',
        password: 'mypassword',
      })
      .expect(201);

    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'john doe',
        email: 'johndoe2@gmail.com',
        password: 'mypassword',
      })
      .expect(201);
  });
});
