import { IsString, IsNotEmpty } from 'class-validator';

export class AccountDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    bank: string;

    @IsString()
    @IsNotEmpty()
    account: string;
}