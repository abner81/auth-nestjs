import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserEntity } from 'infra/user/user.entity';
import { getConnection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({
      instance: { dbName: 'auth-user' },
    });
    const mongoUri = mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('DATABASE_CONNECTION')
      .useValue({
        type: 'mongodb',
        url: mongoUri,
        useNewUrlParser: true,
        synchronize: true,
        useUnifiedTopology: true,
      })
      // .overrideModule(TypeOrmModule)
      // .useModule(
      //   TypeOrmModule.forRootAsync({
      //     useFactory: async () => ({
      //       type: 'mongodb',
      //       url: mongoUri,
      //       database: '',
      //       synchronize: true, // Para criar o esquema de banco de dados automaticamente
      //       entities: [UserEntity], // Adicione suas entidades aqui
      //     }),
      //   }),
      // )
      .compile();

    app = moduleFixture.createNestApplication();
    app.enableShutdownHooks();
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
      password: 'mypassword',
    });
    console.log(result);

    expect(result.status).toBe(201);
  });
});
