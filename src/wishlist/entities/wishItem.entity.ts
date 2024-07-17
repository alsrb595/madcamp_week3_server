import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cart } from "./wishlist.entity";
import { Photo } from "src/photo/entities/photo.entity";


@Entity()
export class CartItem{
    @PrimaryColumn()
    cart_email: string;

    @PrimaryColumn()
    photo_id: number;
    
    @ManyToOne(() => Cart, cart => cart.items)
    @JoinColumn({ name: 'cart_email', referencedColumnName: 'email' })
    cart: Cart;

    @ManyToOne(() => Photo)
    @JoinColumn({ name: 'photo_id', referencedColumnName: 'photo_id'})
    photo: Photo;
}