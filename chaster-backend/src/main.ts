import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
//import * as cookieParser from 'cookie-parser';



dotenv.config(); // Lädt die .env-Datei

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL?.split(',') || 'http://localhost:3000', // Nutzt die Umgebungsvariable
    credentials: true, // Erlaubt Cookies & Autorisierung
  });

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
