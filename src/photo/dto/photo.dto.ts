import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';


export class PhotoDto{
    @IsString()
    @IsNotEmpty()
    filename: string;
    
    @IsString()
    @IsNotEmpty()
    pictured_by: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    
    @IsString()
    @IsNotEmpty()
    mimetype: string;
    
    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    tags: string[];

    @IsString()
    @IsOptional()
    location: string;
}