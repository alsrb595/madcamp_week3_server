import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Like, Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { PostCreateDto } from './dto/post_create.dto';
import { AwsService } from 'src/aws/aws.service';
import { CommentCreateDto } from './dto/comment_create.dto';
import { Comment } from './entities/comment.entity';
import { PostGetDto } from './dto/post_get.dto';
import { title } from 'process';
import { UpdatePostDto } from './dto/post_update.dto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class CommunityService {
    constructor(
        @InjectRepository(Posts)
        private readonly postRepository: Repository<Posts>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @Inject('AWS_S3') private readonly s3: S3,
        private readonly s3Service: AwsService
    ) {}

    async getAll(): Promise<PostGetDto[]>{
        const allPosts = await this.postRepository.find({ relations: ['comments'] });
        return allPosts.map(post => ({
            post_id: post.post_id,
            displayName: post.displayName,
            post_by: post.post_by,
            title: post.title,
            content: post.content,
            urls: post.urls, // 문자열 배열로 변환
            comments: post.comments,
        }));

    }

    async getOne(post_id: number): Promise<PostGetDto>{
        const post = await this.postRepository.findOne({ where: { post_id: post_id }, relations: ['comments'] })
        return{
            post_id: post.post_id,
            displayName: post.displayName,
            post_by: post.post_by,
            title: post.title,
            content: post.content,
            urls: post.urls,
            comments: post.comments,
        }
    }
    async uploadPost(files: Express.Multer.File[], postData: PostCreateDto){
        const uploadPromises = files.map(file => this.s3Service.uploadFile(file));
        const fileUrls = await Promise.all(uploadPromises);

        const post = new Posts()
        post.displayName = postData.displayName;
        post.post_by = postData.post_by;
        post.title = postData.title;
        post.content = postData.content;
        post.urls = fileUrls;

        const newPost = this.postRepository.create(post);
        return await this.postRepository.save(newPost); 

    }

    async uploadComment(commentData: CommentCreateDto): Promise<Comment>{
        const comment = new Comment()
        comment.content = commentData.content;
        comment.displayName = commentData.displayName;
        comment.post_id = commentData.post_id;
        comment.email = commentData.email;

        const newComment = this.commentRepository.create(comment);
        return await this.commentRepository.save(newComment);
    }

    async deleteS3File(url: string) {
        const key = url.split('/').pop();
        await this.s3.deleteObject({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        }).promise();
    }

    async deleteOne(post_id: number): Promise<boolean>{
        const result = await this.postRepository.delete(post_id);
        return true;
    }
    
    async update(post_id: number, files: Express.Multer.File[] = [], updateData: UpdatePostDto): Promise<UpdatePostDto>{
        const post = await this.postRepository.findOneBy({post_id});
        if(files && files.length > 0) {
            for(const url of post.urls){
                await this.deleteS3File(url);
            }

            const uploadPromises = files.map(file => this.s3Service.uploadFile(file));
            const fileurls = await Promise.all(uploadPromises);
            post.urls = fileurls;
        }
        const updatePost = this.postRepository.merge(post, updateData);
        await this.postRepository.save(updatePost);
        return this.getOne(post_id);
    }

    async searchPosts(query: string): Promise<PostGetDto[]> {
        const posts = await this.postRepository.find({
            where: [
                { title: Like(`%${query}%`) },
                { content: Like(`%${query}%`) },
                { displayName: Like(`%${query}%`) },
                { post_by: Like(`%${query}%`) },
            ],
            relations: ['comments']
        });

        return posts.map(post => ({
            post_id: post.post_id,
            displayName: post.displayName,
            post_by: post.post_by,
            title: post.title,
            content: post.content,
            urls: post.urls,
            comments: post.comments,
        }));
    }
}


    // async uploadPhoto(file: Express.Multer.File, photoData: PhotoDto): Promise<Photo> {
    //     const { originalname, mimetype } = file; // file 객체에서 파일의 원본 이름(originalname)과 MIMW타임(mimetype)을 추출, 나중에 데이터베이스 저장시 사용됨
    //     const bucketS3 = process.env.AWS_S3_BUCKET_NAME; // 파일을 업로드할 S3 버킷의 이름을 가져온다. 

    //     const uploadResult = await this.s3.upload({ 
    //         Bucket: bucketS3,
    //         Body: file.buffer, //파일의 버퍼 데이터를 의미
    //         Key: `${originalname}`, //S3에 저장할 파일의 키(경로), 여기서는 원본 파일 이름을 이용하여 유니크한 키를 생성
    //         ContentType: mimetype, // 
    //         ACL: 'public-read', //접근 제어 목록 파일을 공개적으로 읽을 수 있도록 설정
    //     }).promise(); //보통은 콜백을 사용하여 비동기 작업의 결과를 처리를 함 즉, 비동기 작업이 완료된 후에 실행될 함수를 제공하여 그 결과를 처리하는 방식임
    //     // 근데 .promise() 메소드를 사용하면 AWS S3에 파일을 업로드하는 비동기 작업을 Promise로 변환할 수가 있다. 이를 통해 asyns/awit 문법을 사용하여 비동기 작업을 동기식 코드처럼 작성이 가능해진다. 

    //     const newPhotoDto = new PhotoDto(); //새로운 PhotoDto의 객체를 만들어줌
    //     // 새로운 PhotoDto 객체의 각 필드 값들을 지정
    //     newPhotoDto.filename = originalname;
    //     newPhotoDto.url = uploadResult.Location; // uploadResult의 Location
    //     newPhotoDto.price = photoData.price;
    //     newPhotoDto.mimetype = mimetype;
    //     newPhotoDto.pictured_by = photoData.pictured_by;
    //     newPhotoDto.description = photoData.description;
    //     newPhotoDto.tags = photoData.tags;
    //     newPhotoDto.location = photoData.location; 

    //     //새로운 PhotoDto 객체를 생성을 해줌
    //     const newImage = this.photoRepository.create(newPhotoDto);
    //     return await this.photoRepository.save(newImage);
    // }
