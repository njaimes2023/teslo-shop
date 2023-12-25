// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_products
//--  nva entidad Imagen  <ProductImage>
// --  filex: sc_0\V22.03.Semilla_SEED.sql
// --  file :  src\seed\seed.service.ts
// --  ==============================================  

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/users.entity';


@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,

    @InjectRepository( User )
    private readonly userRepository: Repository<User>

  ) {}

  async executeSeed() {

    await this.deleteTables();

    const adminUser = await this.insertUsers();

       // await this.insertNewProducts(  );
      await this.insertNewProducts(adminUser);
      return 'SEED EXECUITED'
 }

  
 
 //-- usuario que creo el producto. 
  private async deleteTables() {
     // primero los productos
    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
    }

 //-- cNuevo metodo: usuario que creo el producto. 
    private async insertUsers() {
      const seedUsers = initialData.users;
      const users: User[] = [];
      seedUsers.forEach( user => {
        users.push( this.userRepository.create( user ) )
      });
      const dbUsers = await this.userRepository.save( seedUsers )
      return dbUsers[0];
    }

    

// adicionar user: usuario que creo el producto. 
private async insertNewProducts(  user: User) {
  await this.productsService.deleteAllProducts();

  // inserta la data masivamente
  const products = initialData.products;
  const insertPromises = [];


       //-- usuario que creo el producto. 
  products.forEach( product => {
    insertPromises.push( this.productsService.create( product , user  )) ;
  });

  await Promise.all( insertPromises );
  return true;
}

}
