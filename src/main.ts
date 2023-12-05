import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const corsOptions = {
    origin: '*', // Permitir apenas este domínio
    methods: ['GET', 'POST','PUT','PATCH','DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
  };

  // Aplicar as opções de CORS usando o middleware CorsModule
  app.use(cors(corsOptions));
  await app.listen(process.env.PORT || 8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();