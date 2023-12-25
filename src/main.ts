// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_producto
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_product.sql
// --  file : src\main.ts
// --  ==============================================  

 
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');
  
  // prefijo global
  app.setGlobalPrefix('api/');

 //-- validador global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

   // -- Documentacion openAPI
  const config = new DocumentBuilder()
  .setTitle('Teslo RESTFul API')
  .setDescription('Teslo shop endpoints')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
// api es el endPoint
SwaggerModule.setup('api', app, document);




  const vcPuerto = `App running on port  ${ process.env.PORT } `;
  await app.listen(process.env.PORT) ;
 console.log  ( 'Console', vcPuerto); 

 logger.log  (  `App running on port  ${ process.env.PORT } ` ); 

}
bootstrap();
