
// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : cargue de archivos 
// --  filex: sc_0\V22.03.Nest1-Carga de archivos.sql
// --  file : src\files\helpers\fileFilter.helper.ts
// --  ==============================================  

export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    // --console.log  ( 'fileFilter=', file); 
    // --si no existe el archivo
    if ( !file ) return callback( new Error('File is empty'), false );

    const fileExptension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg','jpeg','png','gif'];

    if (  validExtensions.includes( fileExptension ) ) {
        return callback( null, true )
    }

    callback(null, false);

}
