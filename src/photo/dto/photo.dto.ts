import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

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
    @IsOptional()
    mimetype: string;
    
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
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