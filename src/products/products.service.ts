// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_products
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_product.sql
// --  file : src\products\products.service.ts
// --  ==============================================  

import { Injectable, BadRequestException,  InternalServerErrorException, Logger, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { validate as isUUID } from 'uuid';
import { Product,  ProductImage } from './entities';

import { User } from '../auth/entities/users.entity';

@Injectable()
export class ProductsService {

  // --Manejo de errores
  private readonly logger = new Logger ('ProductsService')

  

   // --Insertar usando TypeORM . patron reppsitorio
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  
          //  -- IMAGES:  nva entidad Imagen  <ProductImage> 
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
 
      //-- 3. <Query Runner> . verificar si vienen imagenes
    private readonly dataSource: DataSource,

  ) {}
  //-- usuario que creo el producto. add parametro user
  async create(createProductDto: CreateProductDto, user : User ) {
       // --Insertar usando TypeORM 
    try {

      // --if ( !createProductDto.slug )  {
      //  -- createProductDto.slug = createProductDto.title
      //  -- .toLowerCase()
      //  -- .replaceAll(' ', '_')
      //  -- .replaceAll("'", '')
      //  --} else  {
      //  -- createProductDto.slug = createProductDto.title
      //  -- .toLowerCase()
      //  -- .replaceAll(' ', '_')
      //  -- .replaceAll("'", '')
      // -- }
      
      //  -- version sin imagenes
      // --const product = this.productRepository.create(createProductDto);
      // --await this.productRepository.save( product );
      // --return product;

      //  -- version con imagenes
      //  -- IMAGES:  nva entidad Imagen  <ProductImage> 


     const { images = [], ...productDetails } = createProductDto;

      const product = this.productRepository.create( {
        ...productDetails ,
          //-- images: [],
          // map barre un arreglo y devuelve un arreglo transformado
          images: images.map( image => this.productImageRepository.create({ url: image }) ),
           //-- usuario que creo el producto. 
             user, 
         } ) ;

      // console.log ('product=', {product});
      await this.productRepository.save( product );
      return { ...product, images };
      
    } catch (error) {
      this.handleDBExceptions(error);

    }


    return 'This action adds a new product';
  }

  //-- version sin paginacion
  // findAll() {
  // return  this.productRepository.find ({});
  // }


      //-- version con paginacion e imagenes
      async findAll( paginationDto: PaginationDto ) {
        const { limit = 10, offset = 0 } = paginationDto;

        // version sin imagenes
        const products = await   this.productRepository.find({
          take: limit,
          skip: offset,
          // TODO: relaciones
          //  -- IMAGES:  nva entidad Imagen  <ProductImage> . 
          relations: {
            images:true,
          }
        })
        // imagenes planas 
        // return products;
            

          // --imagenes aplanadas
        return products.map( ( product ) => ({
          ...product,
          images: product.images.map( img => img.url )
        }))




      }

    //-- Buscar por id unicamente
  // async findOne(id: string) {
  //   const product = await this.productRepository.findOneBy ({id});

  //   if ( !product ) 
  //   throw new NotFoundException(`Product with ${ id } not found`);
  //   return  product;
  // }

    //-- Buscar por Slug o UUID
    async findOne( term: string ) {
      let product: Product;
  
      if ( isUUID(term) ) {
        product = await this.productRepository.findOneBy({ id: term });
      } else {
        // product = await this.productRepository.findOneBy({ slug: term });
              //QueryBuilder
        // const queryBuilder = this.productRepository.createQueryBuilder(); 
        const queryBuilder = this.productRepository.createQueryBuilder( 'prod' ); 
        product = await queryBuilder
          .where('UPPER(title) =:title or slug =:slug', {
            title: term.toUpperCase(),  // este es :title
            slug: term.toLowerCase(),  //-- este es :slug
          })

          // -- IMAGES:  nva entidad Imagen  <ProductImage> 
          .leftJoinAndSelect('prod.images','prodImages')
          .getOne();
      }
   
      if ( !product ) 
        throw new NotFoundException(`Product with ${ term } not found`);
        return product;
    }

     // -- IMAGES:  nva entidad Imagen  <ProductImage> . aplanar las imagenes
    async findOnePlain( term: string ) {
      const { images = [], ...rest } = await this.findOne( term );
      return {
        ...rest,
        images: images.map( image => image.url )
      }
    }
  
     //-- usuario que creo el producto
         async update( id: string, updateProductDto: UpdateProductDto , user : User  ) {
    
      // --buscar un producto por el ID y cargar todas las propiedadas o columnas
    
      //-- 1. <Query Runner> . extraer las imagenes del resto
      const { images, ...toUpdate } = updateProductDto;

    // version inicial
    //   const product = await this.productRepository.preload({
    //   id: id,
    //   ...updateProductDto,
    //       // -- IMAGES:  nva entidad Imagen  <ProductImage> 
    //       images: [],
    // });

    //-- 2. <Query Runner> 
    const product = await this.productRepository.preload({ id, ...toUpdate });
    console.log (product);

    if ( !product ) throw new NotFoundException(`Product with id: ${ id } not found`);


    //-- 3. <Query Runner> . verificar si vienen imagenes
    //--  Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();       

    try {
       // version inicial
      // await this.productRepository.save( product );
      // return product;

       //-- 3.1 <Query Runner> .  version con queryRunner
       if ( images ) {
        await queryRunner.manager.delete( ProductImage, { product: { id } });
        product.images = images.map( 
          image => this.productImageRepository.create({ url: image }) 
        )
      } 
      // si no tiene imagenes 
    // --v4 else  {
    // --v4  product.images = await this.productImageRepository.findBy ( { product: { id } });
    // --v4  }
      
        //-- usuario que creo el producto
         product.user = user;
      // await this.productRepository.save( product );
      await queryRunner.manager.save( product );

      await queryRunner.commitTransaction();
      await queryRunner.release();
       return this.findOnePlain( id );

      // --v4 return product;


     } catch (error) {    //-- para no grabar titles duplicados
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
      }
   }


  async remove(id: string) {
    const product = await this.findOne ( id ) ;
     await this.productRepository.remove( product );
  }


  // -- manejo de error
  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
