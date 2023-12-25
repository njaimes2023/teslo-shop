// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_0\Autenticar\V19.01.Nest1-Decoradores.sql
// --  file : src\auth\decorators\role-protected.decorator.ts
// --  ==============================================  

import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: ValidRoles[] ) => {

    return SetMetadata( META_ROLES , args);
}
