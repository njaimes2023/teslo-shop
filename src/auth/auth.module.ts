// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_auth - Usuarios
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_usuariosAuth.sql
// --  filex  : sc_0\Autenticar\V19_Nest1-Autenticacion Passport.sql
// --  file : src\auth\auth.module.ts
// --  ==============================================  

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/users.entity';
import { JwtStrategy } from './strategies/jwt.strategy';



@Module({
  controllers: [AuthController],
     // Nest1-Autenticacion Passport
  providers: [AuthService, JwtStrategy ],
  imports: [
     // Nest1-Autenticacion Passport
     ConfigModule,
      // importar usuarios
       TypeOrmModule.forFeature([ User ]),

       //_verPasspors 
       PassportModule.register({ defaultStrategy: 'jwt' }),


      //esto estaba comentariado
      // JwtModule.register({
      //   secret: process.env.JWT_SECRET,
      //   signOptions: {
      //     expiresIn:'2h'
      //   }


   //--:verPasspors:  Módulos Asíncronos: 
       JwtModule.registerAsync({
        imports: [ ConfigModule ],
        inject: [ ConfigService ],
        useFactory: ( configService: ConfigService ) => {
          console.log('JWT Secret', configService.get('JWT_SECRET') )
          // console.log('JWT SECRET', process.env.JWT_SECRET)
          return {
            secret: configService.get('JWT_SECRET'),
            // secret: process.env.JWT_SECRET,
            signOptions: {
              expiresIn:'2h'
            }
          }
        }
      })

  ],
   // -- exportar usuarios
   //--  Nest1-Autenticacion Passport  JwtStrategy
  exports: [ TypeOrmModule, PassportModule, JwtStrategy,  PassportModule, JwtModule ]

  // exports: [ TypeOrmModule, JwtStrategy,  JwtModule ]

})
export class AuthModule {}
