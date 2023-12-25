// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_1\WebSockets\V35..01.Nest1-WebSockets.sql
// --  file :  src\messages-ws\messages-ws.service.ts
// --  ==============================================  

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/users.entity';
import { Repository } from 'typeorm';


//-- interface ConnectedClients {
//--     [id: string]: Socket
//-- }

    //-- 7.Enlazar Socket con Usuario
interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        user: User
    }
}


@Injectable()
export class MessagesWsService {

// -- crear metodo para almacenar todos los clientes 
    private connectedClients: ConnectedClients = {}

    //-- 7.Enlazar Socket con Usuario
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    //  registerClient( client: Socket ) {
    //-- 7.Enlazar Socket con Usuario
    async registerClient( client: Socket, userId: string ) {
    
    //-- 7.Enlazar Socket con Usuario
        const user = await this.userRepository.findOneBy({ id: userId });
        if ( !user ) throw new Error('User not found');
        if ( !user.isActive ) throw new Error('User not active');
   
        //--8.Nombre del Usuario conectado
        this.checkUserConnection( user );

        // this.connectedClients[client.id] = client;
        this.connectedClients[client.id] = {
            socket: client,
            user: user,
        };
        
    }



    removeClient( clientId: string ) {
        delete this.connectedClients[clientId];
    }

    getConnectedClients(): string[] {
        //-- console.log (this.connectedClients);
        return Object.keys( this.connectedClients )  ;
    }

   //--8.Nombre del Usuario conectado 
    getUserFullName( socketId: string ) {
        return this.connectedClients[socketId].user.fullName;
    }

    //-- 9.Desconectar usuarios duplicados
    private checkUserConnection( user: User ) {
        for (const clientId of Object.keys( this.connectedClients ) ) {
            const connectedClient = this.connectedClients[clientId];
            if ( connectedClient.user.id === user.id ){
                connectedClient.socket.disconnect();
                break;
            }
        }
    }




}
