import { Body, Controller, Get, HttpCode, HttpStatus, Param, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserGetDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req){

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        res.redirect('url')
    }

    @Get('/:email')
    @HttpCode(HttpStatus.OK)
    async getUser(@Param('email') email: string): Promise<UserGetDto>{
        return this.userService.getUser(email);
    }
}
