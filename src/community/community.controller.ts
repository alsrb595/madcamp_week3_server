import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostCreateDto } from './dto/post_create.dto';
import { CommunityService } from './community.service';
import { CommentCreateDto } from './dto/comment_create.dto';
import { Comment } from './entities/comment.entity';
import { Posts } from './entities/post.entity';
import { PostGetDto } from './dto/post_get.dto';
import { UpdatePostDto } from './dto/post_update.dto';
import { query } from 'express';

@Controller('community')
export class CommunityController {
    constructor(private readonly communityService: CommunityService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<PostGetDto[]> {
        return this.communityService.getAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getOne(@Param('id') post_id: number): Promise<PostGetDto>{
        return this.communityService.getOne(post_id)
    }


    @Post('upload')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FilesInterceptor('files')) //요청을 가로채는 인터셉터 사용 지정, 여기서 file은 key(필드)명이고 사용자에 여기의 value에 파일을 업로드하게 됨
    //FileInterceptor는 Multer를 사용하여 객체에서 파일 데이터를 추출함 
    async uploadFile(
        @UploadedFiles() files: Express.Multer.File[], // 추출된 파일데이터를 Express.Multer.File 타입의 객체로 변환
        // UseInterceptors 데코레이터는 업로드된 파일 데이터를 포함한 요청 객체를 컨트롤러의 핸들러 메소드(uploadFile)에 전달
        @Body() postData: PostCreateDto
    ) {
        return this.communityService.uploadPost(files, postData);
    }
    @Post('comment/upload')
    @HttpCode(HttpStatus.CREATED)
    async uploadComment(@Body() commentData: CommentCreateDto): Promise<Comment> {
        return this.communityService.uploadComment(commentData);
    }


    @Patch("/:id")
    @UseInterceptors(FilesInterceptor('files'))
    async path(@Param('id') post_id: number, @UploadedFiles() files: Express.Multer.File[] = [], @Body() updateData: UpdatePostDto){
        return this.communityService.update(post_id, files, updateData);
    }

    @Delete("/:id")
    async deletOne(@Param('id') post_id: number){
        return this.communityService.deleteOne(post_id);
    }

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async searchPost(@Query('q') query: string): Promise<PostGetDto[]>{
        return this.communityService.searchPosts(query);
    }

    @Delete("/comment/delete")
    @HttpCode(HttpStatus.OK)
    async deleteComment(@Body('comment_id') comment_id: number): Promise<boolean>{
        return this.communityService.deleteComment(comment_id);
    }

}
