
// -- ==============================================   
// --  proyecto: 04-teslo-shop  
// --  tema  : entity_auth - Usuarios
// --  filex: sc_2\sc_Node8\1Entities\S10.01.Nest1-Entity_usuariosAuth.sql
// --  file : src\auth\entities\users.entity.ts
// --  ==============================================  

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities';

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    // --un usuario tiene muchos productos
    @OneToMany(
        //--la entidad con la cual se relaciona 
        () => Product,
        //--instancia del producto y el atributo con el cual se relaciona 
        ( product ) => product.user
    )
    product: Product;



    // siempre grabar el mail en lowercase
    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
 