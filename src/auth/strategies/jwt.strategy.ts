// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_auth - Usuarios
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_usuariosAuth.sql
// --  filex:  sc_0\Autenticar\V19_Nest1-Autenticacion Passport.sql
// --  file : src\auth\strategies\jwt.strategy.ts
// --  ==============================================  

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';

import { JwtPayload } from '../interfaces';

// import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            //-- en que sposicion espera el token BEARER TOKEN
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

   // valida el usuario y el token vigente
//    async validate( payload: any ): Promise<User> {
    async validate( payload: JwtPayload ): Promise<User> {
        
        const { id } = payload;
        // const {email } = payload;

        const user = await this.userRepository.findOneBy({ id });

        if ( !user ) 
            throw new UnauthorizedException('Token not valid')
            
        if ( !user.isActive ) 
            throw new UnauthorizedException('User is inactive, talk with an admin');
        
     // -- console.log ('jwt.strategy', {user}); 
        return user;
    }

}