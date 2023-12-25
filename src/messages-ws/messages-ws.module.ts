// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_1\WebSockets\V35..01.Nest1-WebSockets.sql
// --  file :  src\messages-ws\messages-ws.module.ts
// --  ==============================================  


import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
   //-- 6.Validar JWT del Handshake
  imports: [ AuthModule ]
})
export class MessagesWsModule {}
