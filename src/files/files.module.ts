// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_0\V22.03.Nest1-Carga de archivos.sql
// --  file : src\files\files.module.ts
// --  ============================================== 

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    ConfigModule
  ]
})
export class FilesModule {}
