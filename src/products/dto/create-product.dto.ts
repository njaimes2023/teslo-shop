// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_products
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_product.sql
// --  file : src\products\dto\create-product.dto.ts
// --  ==============================================  


import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
    IsPositive, IsString,  Min, MinLength, 
    MIN_LENGTH
} from 'class-validator';


export class CreateProductDto {

// -- Documentacion openAPI
@ApiProperty({
    description: 'Product title (unique)',
    nullable: false,
    minLength: 1
})
@IsString()
@MinLength(1)
title: string;

@ApiProperty()
@IsNumber()
@IsPositive()
@IsOptional()
price?: number;

@ApiProperty()
@IsString()
@IsOptional()
description?: string;

@ApiProperty()
@IsString()
@IsOptional()
slug?: string;

@ApiProperty()
@IsInt()
@IsPositive()
@IsOptional()
stock?: number; 

@ApiProperty()
@IsString({ each: true })
@IsArray()
sizes: string[]

@ApiProperty()
@IsIn(['men','women','kid','unisex'])
gender: string;

//-- Nueva columna-Tags
@ApiProperty()
@IsString({ each: true })
@IsArray()
@IsOptional()
tags: string[];

// -- IMAGES:  nva entidad Imagen  <ProductImage> 
@ApiProperty()
@IsString({ each: true })
@IsArray()
@IsOptional()
images?: string[];

}
