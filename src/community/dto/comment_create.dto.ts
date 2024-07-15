import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CommentCreateDto{
    @IsNumber()
    @IsNotEmpty()
    post_id: number;

    @IsString()
    @IsNotEmpty()
    displayName: string;
    
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}