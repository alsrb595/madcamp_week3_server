import { User } from "src/auth/entities/user.entity";
import { Photo } from "src/photo/entities/photo.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Cart{
    @PrimaryColumn()
    email: string;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
    items: CartItem[];

    @Column({ type: 'decimal', default: 0})
    totalPrice: number;

    @Column()
    quantity: number;

    getQuantity(){
       this.quantity = this.items.length;
    }
}

@Entity()
export class CartItem{
    @PrimaryColumn()
    cart_email: string;

    @PrimaryColumn()
    photo_id: number;
    
    @ManyToOne(() => Cart, cart => cart.items)
    @JoinColumn({ name: 'email' })
    cart: Cart;

    @ManyToOne(() => Photo)
    @JoinColumn({ name: 'photo_id' })
    photo: Photo;
}