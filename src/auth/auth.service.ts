// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_auth - Usuarios
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_usuariosAuth.sql
// --  filex  : sc_0\Autenticar\V19_Nest1-Autenticacion Passport.sql
// --  file : src\auth\auth.service.ts
// --  ==============================================  


import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/users.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginUserDto, CreateUserDto  } from './dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,

  ) {}


    async create( createUserDto: CreateUserDto) {
    
      try {
  
        const { password, ...userData } = createUserDto;
    //--  const user = this.userRepository.create(createUserDto);
        const user = this.userRepository.create({
          ...userData,
          password: bcrypt.hashSync( password, 10 )
        });
  
        await this.userRepository.save( user )
        //borramos el password para que no sea visible en consola
        delete user.password;
        // return (user);
        return {
          ...user,
          // token: this.getJwtToken({ email: user.email }
          token: this.getJwtToken({ id: user.id })
        };
        // TODO: Retornar el JWT de acceso
  
      } catch (error) {
        this.handleDBErrors(error);
      }
  
    }



    async login( loginUserDto: LoginUserDto ) {

      const { password, email } = loginUserDto;

      // Consulta simple
      // const user2 = await this.userRepository.findOneBy ({email }) ;
      // return user2;
      
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true } //! OJO!
      });
  
      if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');
    // return user;
  
     //--:verPasspors  
     return {
       ...user,
       token: this.getJwtToken({ id: user.id })
     };
    }


   // Check AuthStatus, revalidar el token
    async checkAuthStatus( user: User ){
      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
      }
   

        //--:verPasspors  
      private getJwtToken( payload: JwtPayload ) {
          // en el contructor
         const token = this.jwtService.sign( payload );
         return token;
     }


    private handleDBErrors( error: any ): never {
      if ( error.code === '23505' ) 
        throw new BadRequestException( error.detail );
      console.log(error)
      throw new InternalServerErrorException('Please check server logs');    }
  
}
