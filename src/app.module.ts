
// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : docker- postgress 
// --  filex : sc_0\V20 04 njn Docker Postgres.sql
// --  filex : sc_0\zV01. 10 TypeORM-Postgres.sql
// --  file : src\app.module.ts
// --  ==============================================  

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      //-- conexion certificada
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl: process.env.STAGE === 'prod'
              ? { rejectUnauthorized: false }
              : null,
      },
      type: 'postgres',
      host:  'localhost' , //process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,      
      autoLoadEntities: true,
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),

    ProductsModule,
    // --paginacion
    CommonModule,
    SeedModule,
    FilesModule,
    AuthModule,
    MessagesWsModule,

  ],
})


export class AppModule {
  constructor () {    console.log ( 'HOST ', process.env.DB_HOST );
    console.log (   'Port= ', +process.env.DB_PORT );
  }
}





