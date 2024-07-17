import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PhotoDto } from './dto/photo.dto';
import { Photo } from './entities/photo.entity';
import { PhotoGetDto } from './dto/photoGet.dto';

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Post('upload')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FilesInterceptor('file'))
    async uploadFile(
        @UploadedFiles() file: Express.Multer.File,
        @Body() photoData: PhotoDto
    ) {
        return this.photoService.uploadPhoto(file, photoData);
    }


    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllPhotos(): Promise<PhotoGetDto[]> { // PhotoDto 객체의 배열을 담고 있는 프로미스를 반환함
        return this.photoService.getAllPhotos();
    }

    @Get('/all/:email')
    @HttpCode(HttpStatus.OK)
    async getAllPhotosByEmail(@Param('email') pictured_by: string): Promise<PhotoGetDto[]> {
        return this.photoService.getAllPhotosByEmail(pictured_by);
    }
    
    @Get('search')
    @HttpCode(HttpStatus.OK)
    async searchPhoto(@Query('q') query: string): Promise<PhotoGetDto[]>
    {
        return this.photoService.searchPhoto(query);
    }
    
    @Get(':id')
    async getPhotoById(@Param('id') photo_id: number): Promise<PhotoGetDto> {
        return this.photoService.getPhotoById(photo_id);
    }

    @Delete(':id')
    async delPhotoById(@Param('id') photo_id: number): Promise<PhotoDto> {
        return this.photoService.delPhotoById(photo_id);
    }
    
    @Get('tags')
    async getTags(): Promise<string[]> {
        return this.photoService.getTags();
    }
}
