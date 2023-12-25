// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_products
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_product.sql
 // --  filex: sc_0\Autenticar\V19.01.Nest1-UsuarioCreaProducto.sql
// --  file :src\products\products.controller.ts
// --  ==============================================  


import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './../common/dtos/pagination.dto';

import { Auth, GetUser }  from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/users.entity';
import { Product } from './entities';

@ApiTags('Products')
@Controller('products')

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  //-- usuario que creo el producto
  @Auth()


  @ApiResponse({ status: 201, description: 'Product was created', type: Product  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })

  

  create(@Body() createProductDto: CreateProductDto,
    //-- usuario que creo el producto
        @GetUser() user: User , 
      ) {
    return this.productsService.create(createProductDto, user ) ;
    
  }

  
  @Get()
  // --sin paginacion
  // --findAll() {
  //  -- return this.productsService.findAll();
  // --}
  // --Con paginacion 
  findAll( @Query() paginationDto:PaginationDto ) {
    // --console.log(paginationDto)
     return this.productsService.findAll(paginationDto);
  }

  //-- Buscar por id unicamente
  // @Get(':id')
  // findOne(@Param('id', ParseUUIDPipe ) id: string) {
  //   return this.productsService.findOne( id );
  // }

  //-- Buscar por Slug o UUID
  @Get(':term')
  findOne(@Param( 'term' ) term: string) {
  //  return this.productsService.findOne( term );
       // -- IMAGES:  nva entidad Imagen  <ProductImage> . aplanar las imagenes
    return this.productsService.findOnePlain( term );
  }

 

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateProductDto: UpdateProductDto,
     //-- usuario que creo el producto.
     @GetUser() user: User , 

  ) {
    console.log ( 'updateProductDto' ,updateProductDto) ;
    // -- usuario que creo el producto.
     return this.productsService.update( id, updateProductDto , user );
  }


  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id',  ParseUUIDPipe )   id: string) {
    return this.productsService.remove(id);
  }
}
