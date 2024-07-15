import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Comment } from "../entities/comment.entity";

export class PostGetDto{
    @IsNumber()
    @IsNotEmpty()
    post_id: number;
     
    @IsString()
    @IsNotEmpty()
    displayName: string;

    @IsString()
    @IsNotEmpty()
    post_by: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsOptional()
    urls: string[];

    @IsOptional()
    comments: Comment[];
}