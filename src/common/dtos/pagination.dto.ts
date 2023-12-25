
// -- ==============================================   
// --  proyecto :  < 04-teslo-shop >
// --  filex: sc_0\V20 01 njn paginacion.sql
// --  filex: src\common\dto\pagination.dto.ts
// --  ==============================================  
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

    // -- Documentacion openAPI 
    @ApiProperty({
        default: 10, description: 'How many rows do you need'
    })

    @IsOptional()
    @IsPositive()
    // validacion de numero
    @Type( () => Number ) // enableImplicitConversions: true
    limit?: number;
    

   // -- Documentacion openAPI 
    @ApiProperty({
        default: 0, description: 'How many rows do you want to skip'
    })
    @IsOptional()
    @Min(0)
    @Type( () => Number ) // enableImplicitConversions: true
    offset?: number;
}