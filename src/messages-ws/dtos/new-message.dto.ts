// -- ==============================================   
// --  proyecto: <05-ws-client>
// --  tema  : cliente Vite Vanilla TypeScript
// --  filex:  sc_1\WebSockets\V35..01.Nest1-WebSockets ClientVainilla.jwt.sql 
// --  file :  src\messages-ws\dtos\new-message.dto.ts
// --  ==============================================  

import { IsString, MinLength } from 'class-validator';


export class NewMessageDto {
    @IsString()
    @MinLength(1)
    message: string;
}