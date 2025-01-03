import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Permite apenas seu frontend Vue.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite cookies e headers de autenticação
  });
  
  await app.listen(3636);
}
bootstrap();
