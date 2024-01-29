import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
      .setTitle('EnjoyService API')
      .setDescription('The enjoy service API description')
      .setVersion('1.0')
      .addTag('enjoy')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(9903);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
