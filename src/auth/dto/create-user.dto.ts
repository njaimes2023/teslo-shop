// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_auth - Usuarios
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_usuariosAuth.sql
// --  file : src\auth\dto\create-user.dto.ts
// --  ==============================================  
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;

}