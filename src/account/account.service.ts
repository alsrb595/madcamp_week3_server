import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccount } from './entities/account.entity';
import { Repository } from 'typeorm';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(UserAccount)
        private readonly accountRepository: Repository<UserAccount>
    ) {}

    async createOne(accountData: AccountDto): Promise<UserAccount>{
        const newAccount = this.accountRepository.create(accountData);
        return this.accountRepository.save(accountData)
    }
    //async createOne(accountData: AccountDto): Promise<UserAccount> 메서드는 this.accountRepository.save(accountData)의 성공 여부를 나타내는 Promise<UserAccount>를 반환
}
