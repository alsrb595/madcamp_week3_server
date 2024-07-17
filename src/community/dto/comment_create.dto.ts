import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class CommentCreateDto{
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
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