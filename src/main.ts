import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permitir apenas essa origem
    methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
    credentials: true, // Permitir cookies e headers autenticados
  });

  await app.listen(3007);
}
bootstrap();
