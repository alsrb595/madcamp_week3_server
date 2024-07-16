import { Module } from '@nestjs/common';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PhotoModule } from 'src/photo/photo.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Purchase, User]),
    PhotoModule
  ],
  controllers: [DealController],
  providers: [DealService]
})
export class DealModule {}
