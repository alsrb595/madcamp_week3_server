import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/wishlist.entity';
import { CartItem } from './entities/wishItem.entity';
import { Photo } from 'src/photo/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Photo])
  ],
  controllers: [WishlistController],
  providers: [WishlistService]
})
export class WishlistModule {}
