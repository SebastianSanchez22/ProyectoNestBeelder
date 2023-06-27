import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const options = new DocumentBuilder() 
  .setTitle('MongoDB Beelder REST API')
  .setDescription('API REST para Beelder')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options); 

  // La ruta en que se sirve la documentación
  SwaggerModule.setup('docs', app, document); 

  await app.listen(4000);

}
bootstrap();
