import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { S3 } from 'aws-sdk';
import { PhotoDto } from './dto/photo.dto';
import { PhotoGetDto } from './dto/photoGet.dto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>, //Repository는 데이버베이스 관련 함수를 제공해줄 수 있음
        @Inject('AWS_S3') private readonly s3: S3, //aws 모듈에서 지정해 놓은 이름을 이용해 현재 class에 inject
    ) {}

    private photos: Photo[] = [];

    async uploadPhoto(file: Express.Multer.File, photoData: PhotoDto): Promise<Photo> {
        const { originalname, mimetype } = file; // file 객체에서 파일의 원본 이름(originalname)과 MIMW타임(mimetype)을 추출, 나중에 데이터베이스 저장시 사용됨
        const bucketS3 = process.env.AWS_S3_BUCKET_NAME; // 파일을 업로드할 S3 버킷의 이름을 가져온다. 

        const uploadResult = await this.s3.upload({ 
            Bucket: bucketS3,
            Body: file.buffer, //파일의 버퍼 데이터를 의미
            Key: `${originalname}`, //S3에 저장할 파일의 키(경로), 여기서는 원본 파일 이름을 이용하여 유니크한 키를 생성
            ContentType: mimetype, // 
            ACL: 'public-read', //접근 제어 목록 파일을 공개적으로 읽을 수 있도록 설정
        }).promise(); //보통은 콜백을 사용하여 비동기 작업의 결과를 처리를 함 즉, 비동기 작업이 완료된 후에 실행될 함수를 제공하여 그 결과를 처리하는 방식임
        // 근데 .promise() 메소드를 사용하면 AWS S3에 파일을 업로드하는 비동기 작업을 Promise로 변환할 수가 있다. 이를 통해 asyns/awit 문법을 사용하여 비동기 작업을 동기식 코드처럼 작성이 가능해진다. 

        const newPhotoDto = new PhotoDto(); //새로운 PhotoDto의 객체를 만들어줌
        // 새로운 PhotoDto 객체의 각 필드 값들을 지정
        newPhotoDto.filename = originalname;
        newPhotoDto.url = uploadResult.Location; // uploadResult의 Location
        newPhotoDto.price = photoData.price;
        newPhotoDto.mimetype = mimetype;
        newPhotoDto.pictured_by = photoData.pictured_by;
        newPhotoDto.description = photoData.description;
        newPhotoDto.tags = photoData.tags;
        newPhotoDto.location = photoData.location; 

        //새로운 PhotoDto 객체를 생성을 해줌
        const newImage = this.photoRepository.create(newPhotoDto);
        return await this.photoRepository.save(newImage);
    }

    async getAllPhotos(): Promise<PhotoGetDto[]>{
        const photos = await this.photoRepository.find(); //.find() 메서드를 통해 모든 데이터를 비동기적으로 가져온다. 
        return photos.map(photo => ({ // photos 배열의 각 항목을 map 메서드를 사용하여 반환하는 것 // 객체 변환 부분 ({ ... }) photo 객체를 새로운 객체로 변환한다. 
            photo_id: photo.photo_id,
            filename: photo.filename,
            pictured_by: photo.pictured_by,
            url: photo.url,
            mimetype: photo.mimetype,
            price: photo.price,
            description: photo.description,
            tags: photo.tags,
            location: photo.location,
        }));
    }

    async getPhotoById(photo_id: number): Promise<PhotoGetDto>{
        const photo = await this.photoRepository.findOneBy({ photo_id }); // 특정 필드를 이용해 검색을 하는 것이기에 {}로 감싼 후에 전달 해줘야 됨
        if (!photo) {
            throw new Error('Photo not found');
        }

        return{ //부분에서 반환된 객체가 PhotoGetDto 타입과 일치하면, TypeScript는 이를 PhotoGetDto 타입으로 간주
            photo_id: photo.photo_id,
            filename: photo.filename,
            pictured_by: photo.pictured_by,
            url: photo.url,
            mimetype: photo.mimetype,
            price: photo.price,
            description: photo.description,
            tags: photo.tags,
            location: photo.location,
        }
    }

    async delPhotoById(photo_id: number): Promise<PhotoDto>{
        const photo = await this.photoRepository.findOne({where: {photo_id: photo_id } });
        if(!photo){
            throw new Error('Photo not found');
        }

        const bucketS3 = process.env.AWS_S3_BUCKET_NAME;
        const deleteResult = this.s3.deleteObject({
            Bucket: bucketS3,
            Key: photo.filename,
        }).promise();

        const where: FindOptionsWhere<Photo> = { photo_id: photo_id };
        await this.photoRepository.delete(where);

        return photo;
    }

    async searchPhoto(query: string): Promise<PhotoGetDto[]>{
        const photos = await this.photoRepository.find({
            where: [
                { filename: Like(`%${query}%`) },
                { pictured_by: Like(`%${query}%`) },
                { description: Like(`%${query}%`) },
                { tags: Like(`%${query}%`) },
                { location: Like(`%${query}%`) },
            ]
        });
        return photos.map(photo => ({
            photo_id: photo.photo_id,
            filename: photo.filename,
            pictured_by: photo.pictured_by,
            url: photo.url,
            mimetype: photo.mimetype,
            price: photo.price,
            description: photo.description,
            tags: photo.tags,
            location: photo.location
        }))
    }

    async getAllPhotosByEmail(pictured_by: string): Promise<PhotoGetDto[]> {
        const photos = await this.photoRepository.find({ where: { pictured_by } });
        return photos.map(photo => ({
            photo_id: photo.photo_id,
            filename: photo.filename,
            pictured_by: photo.pictured_by,
            url: photo.url,
            mimetype: photo.mimetype,
            price: photo.price,
            description: photo.description,
            tags: photo.tags,
            location: photo.location
        }))
    }

    async getTags(): Promise<string[]>  {
        const photos = await this.photoRepository.find();
        const tagSet = new Set<string>();

        photos.forEach(photo => {
            photo.tags.forEach(tag => tagSet.add(tag));
        })

        return Array.from(tagSet)
    }
}
