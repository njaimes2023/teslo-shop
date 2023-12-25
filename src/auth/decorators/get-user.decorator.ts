// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_0\Autenticar\V19.01.Nest1-Decoradores.sql
// --  file : src\auth\decorators\get-user.decorator.ts
// --  ==============================================  
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetUser = createParamDecorator(

//   () => {
//      return 'HOla Mundo'
//   }

    ( data: string, ctx: ExecutionContext ) => {

         console.log  ( { data}) ;
        // console.log  ( ctx ) ;
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if ( !user )   //--error 500
            throw new InternalServerErrorException('User not found (request)');
            // -- return user;
            //-- CustomDecorator
            //-- si no existe la data.( parametro de entrada) devuelvo el uisuario de lo contrario devuelvo la data  
        return ( !data ) 
            ? user 
            : user[data];
        
    }
);