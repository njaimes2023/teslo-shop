// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_auth - Usuarios
 // --  filex: sc_0\Autenticar\V19.01.Nest1-Decoradores.sql
// --  file : src\auth\decorators\auth.decorator.ts
// --  ==============================================  

import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';


export function Auth(...roles: ValidRoles[]) {

  return applyDecorators(
  // RoleProtected( ValidRoles.superUser, ValidRoles.admin ),
     RoleProtected(...roles),
  UseGuards( AuthGuard(), UserRoleGuard ),  
)  
 
}