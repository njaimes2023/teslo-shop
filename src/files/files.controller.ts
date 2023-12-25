// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_0\V22.03.Nest1-Carga de archivos.sql
// --  file : src\files\files.controller.ts
// --  ==============================================  

import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UploadedFile, 
                 UseInterceptors, BadRequestException } 
               from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';               
import { FilesService } from './files.service';

//  --funciona solo paraa nest. no para express
import { FileInterceptor } from '@nestjs/platform-express';

import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';



@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService,
     // --6. Retornar el secureUrl. acceso a las variables de entorno
  private readonly configService: ConfigService,

    ) {}



 //  --servir un archivo especifico
  @Get('product/:imageName')
  findProductImage(
    //  --decorador para devolcer la imagen
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    //  --trae el path del la ubicacion del archivo
    const path = this.filesService.getStaticProductImage( imageName );

    //  --este4 devuelve el archivo  
    res.sendFile( path );

    // --return path;
    // -- este comando devuelve el path del archivoi
    //  --res.status(403).json (
    //  --  {
    //  --    ok: false,
    //  --    path: path
    //   -- }
    //  --)   
  }
  



 @Post('product')
// -- implementar el ingerceptor
 @UseInterceptors( FileInterceptor('file' , {
  // controla la extension del archivo
  fileFilter: fileFilter,
    // --grabar en filesystem
    // --limits: { fileSize: 1000 }
    storage: diskStorage({
      destination: './static/products',
      //-- renombrar archivo. colocar la extenison
      filename: fileNamer
    })

 })   )

 uploadProductImage(
    // -- decorador para leeer elarchivo
    @UploadedFile() file: Express.Multer.File, 
    ){
    
      if ( !file ) {
        throw new BadRequestException('Make sure that the file is an image');
      }
      
    // --return file;
    // --console.log ( {fileInController: file });

      //Servir archivos de manera controlada.
      //  const secureUrl = `${ file.filename }`;
      //Retornar el secureUrl
      const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`;


        console.log (this.configService.get('HOST_API'));

    //  return {fileName: file.originalname
    return { secureUrl };
     }
  



  // @UseInterceptors( FileInterceptor('file', {
  //   fileFilter: fileFilter,
  //   // limits: { fileSize: 1000 }
  //   storage: diskStorage({
  //     destination: './static/products',
  //     filename: fileNamer
  //   })
  // }) )
  
  // uploadProductImage( 
  //   @UploadedFile() file: Express.Multer.File,
  // ){

  //   if ( !file ) {
  //     throw new BadRequestException('Make sure that the file is an image');
  //   }

  //   // const secureUrl = `${ file.filename }`;
  //   const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`;

  //   return { secureUrl };
  // }


}
