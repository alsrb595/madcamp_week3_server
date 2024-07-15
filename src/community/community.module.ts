import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { AwsModule } from 'src/aws/aws.module';
import { Comment } from './entities/comment.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, Comment]),
    AwsModule
  ],
  controllers: [CommunityController],
  providers: [CommunityService]
})
export class CommunityModule {}
