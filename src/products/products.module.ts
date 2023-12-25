// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_products
//--  nva entidad Imagen  <ProductImage>
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_product.sql
// --  file : src\products\products.module.ts
// --  ==============================================  

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';


import { Product, ProductImage } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  // entity_products
  imports: [
    // nva entiadImagen
    TypeOrmModule.forFeature([ Product,  ProductImage ]),
    AuthModule
  ],
   exports: [
    ProductsService,
    TypeOrmModule,
  ]
})
export class ProductsModule {}
