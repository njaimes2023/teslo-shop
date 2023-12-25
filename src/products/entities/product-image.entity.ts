// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_products
//--  nva entidad Imagen  <ProductImage>
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_product.sql
// --  file : src\products\entities\product-image.entity.ts
// --  ==============================================  

import { ApiProperty } from '@nestjs/swagger';
import { Product } from './';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';



// @Entity()
@Entity({ name: 'product_images' })
export class ProductImage {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column('text')
    url: string;

    // -- IMAGES:  nva entidad Imagen  <ProductImage> 
    @ApiProperty()
    @ManyToOne(
        () => Product,
        ( product ) => product.images,
        {  onDelete: 'CASCADE' }
    )
    product: Product

}