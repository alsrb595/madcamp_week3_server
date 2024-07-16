import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { AccountModule } from './account/account.module';
import { UserAccount } from './account/entities/account.entity';
import { PhotoModule } from './photo/photo.module';
import { AwsModule } from './aws/aws.module';
import { Photo } from './photo/entities/photo.entity';
import { WishlistModule } from './wishlist/wishlist.module';
import { CommunityModule } from './community/community.module';
import { Posts } from './community/entities/post.entity';
import * as dotenv from 'dotenv';
import { Comment } from './community/entities/comment.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DealModule } from './deal/deal.module';
import { Purchase } from './deal/entities/purchase.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, UserAccount, Photo, Posts, Comment,Purchase],
      synchronize: true,
      driver: require('mysql2')
    }),
    AuthModule,
    AccountModule,
    PhotoModule,
    AwsModule,
    WishlistModule,
    CommunityModule,
    DealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
