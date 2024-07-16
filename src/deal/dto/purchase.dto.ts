import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PurchaseCreateDto {
    @IsString()
    @IsNotEmpty()
    consumer_email: string;

    @IsNumber()
    @IsNotEmpty()
    photo_id: number;

    @IsBoolean()
    @IsNotEmpty()
    is_delivered: boolean;
}
