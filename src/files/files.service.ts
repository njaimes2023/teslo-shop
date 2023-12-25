// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_0\V22.03.Nest1-Carga de archivos.sql
// --  file : src\files\files.service.ts
// --  ============================================== 


import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
 
  
 // servir archivos. verifica si existe la imgen y devuelve el path completo
  getStaticProductImage( imageName: string ) {
    const path = join( __dirname, '../../static/products', imageName );
    if ( !existsSync(path) ) 
        throw new BadRequestException(`No product found with image ${ imageName }`);
    return path;
}

}
