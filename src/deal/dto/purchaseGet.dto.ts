import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { Photo } from "src/photo/entities/photo.entity";

export class PurchaseGetDto{
    @IsNumber()
    @IsNotEmpty()
    photo_id: number;

    @IsString()
    @IsNotEmpty()
    consumer_email: string;
    
    @IsBoolean()
    @IsNotEmpty()
    is_delivered: boolean;

    photo: Photo;

    consumer: User;
}