import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserEntity } from 'infra/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(TypeOrmModule)
      .useModule(
        TypeOrmModule.forRootAsync({
          useFactory: async () => ({
            type: 'mongodb',
            url: mongoUri,
            synchronize: true, // Para criar o esquema de banco de dados automaticamente
            entities: [UserEntity], // Adicione suas entidades aqui
          }),
        }),
      )
      .compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();

    // Aqui você deve configurar o TypeORM para usar a URI do MongoDB na memória
    await app.init();
  });

  afterAll(async () => {
    await mongoServer.stop();
    await app.close();
  });

  it('/ (GET)', async () => {
    const result = await request(app.getHttpServer()).post('/users').send({
      name: 'john doe',
      email: 'abner81@live.com',
      password: 'mypassw',
    });
    expect(result.status).toBe(201);
  });
});
