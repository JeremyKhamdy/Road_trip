import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
      .setTitle('DrinkService API')
      .setDescription('The drinks service API description')
      .setVersion('1.0')
      .addTag('drink')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(9901);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
