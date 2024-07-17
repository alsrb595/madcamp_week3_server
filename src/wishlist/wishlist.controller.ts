import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { cartCreateDto } from './dto/wishlist.dto';
import { CartItem } from './entities/wishItem.entity';

@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async postCart(@Body('email') email: string, @Body('photo_id') photo_id: number): Promise<CartItem> {
        return this.wishlistService.addItem(email, photo_id);
    }

    @Get("/:email")
    @HttpCode(HttpStatus.OK)
    async getCart(@Param('email') email: string): Promise<CartItem[]> {
        return this.wishlistService.getCart(email);
    }
    
    @Delete("delete")
    @HttpCode(HttpStatus.OK)
    async deleteItem(@Body('email') email: string, @Body('photo_id') photo_id: number): Promise<boolean>{
        return this.wishlistService.deleteItem(email, photo_id);
    }
}
