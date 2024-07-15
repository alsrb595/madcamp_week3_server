import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Posts } from "src/community/entities/post.entity";
import { Photo } from "src/photo/entities/photo.entity";

export class UserGetDto{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    googleId: string;

    @IsString()
    @IsNotEmpty()
    displayName: string;

    @IsOptional()
    photos: Photo[];

    @IsOptional()
    posts: Posts[];
}