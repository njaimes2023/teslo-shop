// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_auth - Usuarios
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_usuariosAuth.sql
// --  filex:  sc_0\Autenticar\V19_Nest1-Autenticacion Passport.sql
 // --  filex: sc_0\Autenticar\V19.01.Nest1-Decoradores.sql
// --  file : src\auth\auth.controller.ts
// --  ==============================================  

import { Controller, Get, Post, Body, Req, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities/users.entity';

import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    // return this.authService.login( loginUserDto );
    return this.authService.login( loginUserDto );
  }

     // Check AuthStatus, revalidar el token
  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }


  //--:verPasspors
  // --  get http://localhost:3000/api/auth/private
  @Get('private')
  // -- este codigo es para convertirlo en private
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    //--:verDecorator. captura la request
    //  --@Req() request: Express.Request,
    @GetUser( ) user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    // --@Headers() headers:    IncomingHttpHeaders,  no funciuono
  ) {
    // --console.log (request);
    // --console.log  ({ user: request.user });
    // --console.log  ( 'rawHeaders' , rawHeaders);
    // --console.log  ({ userEmail });
    // --return 'Hola Mundo';
    return {
      ok: true,
      message: 'Hola Mundo Private',
         user,
      userEmail,
      rawHeaders,
      // headers
    }
  }


    // -- se usa para enviar parametros al metodo
    // @SetMetadata('roles', ['admin','super-user'])
  // -- validar los roles
    @Get('private2')
    @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
    @UseGuards( AuthGuard(), UserRoleGuard )
    privateRoute2(
      @GetUser() user: User
    ) {
  
      return {
        ok: true,
        user
      }
    }

    @Get('private3')
    @Auth( ValidRoles.admin )
     privateRoute3(
      @GetUser() user: User
      ) {
  
      return {
        ok: true,
        user
      }
    }

    
}
