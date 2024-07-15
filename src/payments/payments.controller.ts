import { Controller, Get, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Get('/')
    getCheckout(@Res() res: Response) {
        const path = join(__dirname, '..', '..', 'public', 'checkout.html');
        console.log('Serving file from path:', path);  // 경로 출력
        res.sendFile(path);
    }

    @Post('/confirm')
    async confirmPayment(@Body() body, @Res() res: Response) {
        const { paymentKey, orderId, amount } = body;
        try {
        const result = await this.paymentsService.confirmPayment(paymentKey, orderId, amount);
        res.status(200).json(result);
        } catch (error) {
        res.status(400).json(JSON.parse(error.message));
        }
    }

    @Get('/success')
    getSuccess(@Res() res: Response) {
        const path = join(__dirname, '..', '..', 'public', 'success.html');
        console.log('Serving file from path:', path);  // 경로 출력
        res.sendFile(path);
    }

    @Get('/fail')
    getFail(@Res() res: Response) {
        const path = join(__dirname, '..', '..', 'public', 'fail.html');
        console.log('Serving file from path:', path);  // 경로 출력
        res.sendFile(path);
    }
}
