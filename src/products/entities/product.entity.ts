// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_producto
//--  nva entidad Imagen  <ProductImage>
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_product.sql
// --  file : src\products\entities\product.entity.ts
// --  ==============================================  

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductImage } from './product-image.entity';

 import { User } from '../../auth/entities/users.entity'


  // @Entity()

@Entity( {name: 'products'})
export class Product {

    // Documentacion: OpenAPI 
    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price',
    })
    @Column('float',{
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'Anim reprehenderit nulla in anim mollit minim irure commodo.',
        description: 'Product description',
        default: null,
    })        
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['M','XL','XXL'],
        description: 'Product sizes',
    })
    @Column('text',{
        array: true
    })
    sizes: string[];
    
    @ApiProperty({
        example: 'women',
        description: 'Product gender',
    })
    @Column('text')
    gender: string;   //genero


   // -- Nueva columna-Tags
   @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    // -- IMAGES:  nva entidad Imagen  <ProductImage> 
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        // eager para que consulte en cascada
        { cascade: true, eager: true }
      )
    images?: ProductImage[];


    // Un producto solo tiene un usuario
    @ManyToOne(
        // la entidad a relacionar
        () => User,
         // -- el where
        ( user ) => user.product,
        // cargar la relacuion automaticamente
        { eager: true }
    )
    user: User


     //-- BeforeInsert y BeforeUpdate
    @BeforeInsert()
    checkSlugInsert() {
        if ( !this.slug ) {
            this.slug = this.title;
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
   }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

}

