
// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_0\V22.03.Nest1-Carga de archivos.sql
// --  file : src\files\helpers\fileNamer.helper.ts
// --  ==============================================  

import { v4 as uuid } from 'uuid'

export const fileNamer = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    // console.log({ file })
    if ( !file ) return callback( new Error('File is empty'), false );

    const fileExtension = file.mimetype.split('/')[1];


    // const fileName = `Hola Mundo.${ fileExtension }`;

    const fileName = `${ uuid() }.${ fileExtension }`;


    callback(null, fileName );

}
