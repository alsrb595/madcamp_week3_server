import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoDto } from './dto/photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotoGetDto } from './dto/photoGet.dto';

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Post('upload')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file')) //요청을 가로채는 인터셉터 사용 지정, 여기서 file은 key(필드)명이고 사용자에 여기의 value에 파일을 업로드하게 됨
    //FileInterceptor는 Multer를 사용하여 객체에서 파일 데이터를 추출함 
    async uploadFile(
        @UploadedFile() file: Express.Multer.File, // 추출된 파일데이터를 Express.Multer.File 타입의 객체로 변환
        // UseInterceptors 데코레이터는 업로드된 파일 데이터를 포함한 요청 객체를 컨트롤러의 핸들러 메소드(uploadFile)에 전달
        @Body() photoData: PhotoDto
    ) {
        return this.photoService.uploadPhoto(file, photoData);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllPhotos(): Promise<PhotoGetDto[]> { // PhotoDto 객체의 배열을 담고 있는 프로미스를 반환함
        return this.photoService.getAllPhotos();
    }

    @Get(':id')
    async getPhotoById(@Param('id') photo_id: number): Promise<PhotoGetDto> {
        return this.photoService.getPhotoById(photo_id);
    }

    @Delete(':id')
    async delPhotoById(@Param('id') photo_id: number): Promise<PhotoDto> {
        return this.photoService.delPhotoById(photo_id);
    }
}
