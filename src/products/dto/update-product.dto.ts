// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_products
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_product.sql
// --  file :src\products\dto\update-product.dto.ts
// --  ==============================================  


// ya n0 va  import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
