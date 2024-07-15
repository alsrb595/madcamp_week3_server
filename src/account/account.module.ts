import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from './entities/account.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccount, User])
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule {}
