import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/wishItem.entity';
import { Photo } from 'src/photo/entities/photo.entity';

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,

        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,

        @InjectRepository(Photo)
        private photoRepository: Repository<Photo>
    ) {}

    async addItem(email: string, photo_id: number): Promise<CartItem>{
        let cart = await this.cartRepository.findOne({where: {email}, relations: ['items']})
        //relations: ['items']는 Cart 엔티티를 조회할 때 해당 Cart에 연결된 CartItem 엔티티들도 함께 조회하라는 의미입니다. 이 옵션을 사용하면 Cart 엔티티를 조회할 때 items 필드에 연결된 CartItem 엔티티들이 포함됩니다.
        if(!cart){
            cart = this.cartRepository.create({email, items: []});
            await this.cartRepository.save(cart);
        }

        const photo = await this.photoRepository.findOne({where: {photo_id: photo_id}});
        if(!photo) {
            throw new Error('Photo not found');
        }

        const cartItem = this.cartItemRepository.create({cart_email: email, photo_id: photo_id});
        await this.cartItemRepository.save(cartItem);

        return cartItem;
    }
    
    async getCart(email: string): Promise<CartItem[]> {
        const cart = await this.cartRepository.findOne({where: {email}, relations: ['items', 'items.photo']});

        return cart.items
    }

    async deleteItem(email: string, photo_id: number): Promise<boolean>{
        const cartItem = await this.cartItemRepository.findOneBy({ cart_email: email, photo_id: photo_id });
        await this.cartItemRepository.remove(cartItem)
        return true;
    }
}
