// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_1\WebSockets\V35..01.Nest1-WebSockets.sql
// --  file :  src\messages-ws\messages-ws.gateway.ts
// --  ==============================================  



import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';

import { MessagesWsService } from './messages-ws.service';

import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway( { cors: true  })

export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

   //-- decorador. enviar mensaje todos los conectados
  @WebSocketServer() wss: Server;
  
  constructor(private readonly messagesWsService: MessagesWsService,
    //-- 6.Validar JWT del Handshake
    private readonly jwtService: JwtService
    ) {}


  //--  7.Enlazar Socket con Usuario

async  handleConnection(client: Socket  ) {
    //-- console.log ( 'Cliente Conectado' , client );
    //-- unir el cliente a un a sala especifica
    //-- client.join ('ventas');
    //-- client.join (client.id);
    //-- client.join (user.email);  // otra opcion para identificar al usuario
    //-- emite a todos en la sala el mensaje
    //-- this.wss.to('ventas').emit ('');

     //-- 5.Preparar cliente para enviar JWT. adiconar parametro token 
     const token = client.handshake.headers.authentication as string;
     //--  console.log ( 'Cliente Conectado. token=' , token );
     //-- 6.Validar JWT del Handshake
     let payload: JwtPayload;
     try {
      payload = this.jwtService.verify( token );
        //--  7.Enlazar Socket con Usuario
      await this.messagesWsService.registerClient( client, payload.id );

    } catch (error) {
      client.disconnect();
      return;
    }
    // console.log ( 'Cliente Conectado. payload=' , payload ); 
    // this.messagesWsService.registerClient( client );
    // console.log ( { Conectados:  this.messagesWsService.getConnectedClients()} );

    //--  enviar mensaje todos los conectados
    this.wss.emit('clients-updated' , this.messagesWsService.getConnectedClients() );
  }

  handleDisconnect(client: Socket) {
    // console.log ( 'Cliente desConectado' , client.id);
    this.messagesWsService.removeClient( client.id );
    // console.log ( { Conectados:  this.messagesWsService.getConnectedClients()} );
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() );
   }

  // message-from-client. Emitir Cliente - Escuchar Servidor
     @SubscribeMessage('message-from-client')
     async onMessageFromClient( client: Socket, payload: NewMessageDto ) {
      console.log ( 'SubscribeMessage=',  client.id, payload);

     //! Emite únicamente al cliente. recibe solo el cliente que lo emitio
    //  client.emit('message-from-server', {
    //    fullName: 'Soy Yo!',
    //    message: payload.message || 'no-message!!'
    //  });
 
     //! Emitir a todos MENOS, al cliente inicial
    //  client.broadcast.emit('message-from-server', {
    //    fullName: 'Soy Yo!',
    //    message: payload.message || 'no-message!!'
    //  });
 
     //! Emitir a todo el mundo conectado
       this.wss.emit('message-from-server', {
      //  fullName: 'Soy Yo!',
       //-- 8.Nombre del Usuario conectado
       fullName: this.messagesWsService.getUserFullName(client.id),
       message: payload.message || 'no-message!!'
     });

 
 
   }
   


}
