import { User } from "src/auth/entities/user.entity";
import { Photo } from "src/photo/entities/photo.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { CartItem } from "./wishItem.entity";

@Entity()
export class Cart{
    @PrimaryColumn()
    email: string;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
    items: CartItem[];

}