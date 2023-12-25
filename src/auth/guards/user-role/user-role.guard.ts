// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_auth - Usuarios
 // --  filex: sc_0\Autenticar\V19.01.Nest1-Decoradores.sql
// --  file : src\auth\guards\user-role\user-role.guard.ts
// --  ==============================================  

import { Reflector } from '@nestjs/core';

import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/users.entity';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  //--addnjn
  constructor(
    private readonly reflector: Reflector
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // const validRoles: string[] = this.reflector.get( 'roles', context.getHandler());
    const validRoles: string[] = this.reflector.get( META_ROLES , context.getHandler() )
    //  --console.log (validRoles);

    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;
    
    // --Verificar rol del usuario
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if ( !user ) 
      throw new BadRequestException('User not found');
    
      // --console.log ({ userRoles: user.roles });

    // evaluar si el rolde entrada  esta en el roll del usuario
    for (const role of user.roles ) {
      if ( validRoles.includes( role ) ) {
        return true;
      }
    }
   
    throw new ForbiddenException(
      `User ${ user.fullName } need a valid role: [${ validRoles }]`
    );
    //-- console.log ('UserRoleGuard');
    // --return true;
  }
}
