import { Controller, Get, Req, Res, UseGuards, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserGetDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        const user = req.user as User;
        // 사용자 정보를 저장한 후, JWT 토큰을 생성하거나 세션을 시작할 수 있습니다.
        // 예시: res.redirect('http://your-frontend-url?token=jwt-token');
        // res.redirect('http://your-frontend-url');
        res.redirect('http://143.248.177.211:5173')
    }

    @Get('/:email')
    @HttpCode(HttpStatus.OK)
    async getUser(@Param('email') email: string): Promise<UserGetDto> {
        return this.userService.getUser(email);
    }
}
