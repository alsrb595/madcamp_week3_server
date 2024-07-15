import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post('/made')
    @HttpCode(HttpStatus.CREATED)
    createAccount(@Body() accountData: AccountDto){
        return this.accountService.createOne(accountData);
    }
}
