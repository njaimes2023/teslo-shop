// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_0\Autenticar\V19.01.Nest1-Decoradores.sql
// --  file : src\auth\decorators\raw-headers.decorator.ts
// --  ==============================================  

import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {

        const req = ctx.switchToHttp().getRequest();
        return req.rawHeaders;
    }
);