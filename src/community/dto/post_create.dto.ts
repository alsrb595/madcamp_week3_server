import { DateTime } from "aws-sdk/clients/devicefarm";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PostCreateDto{
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

    // @IsDate()
    // @IsNotEmpty()
    // created_at: DateTime;

}