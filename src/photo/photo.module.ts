import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { AwsModule } from '../aws/aws.module'; // 올바른 경로로 수정

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    AwsModule,
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [TypeOrmModule],
})
export class PhotoModule {}
