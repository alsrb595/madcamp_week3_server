import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { DealService } from './deal.service';
import { PurchaseCreateDto } from './dto/purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { UpdatePurchaseDto } from './dto/updatePurchase.dto';

@Controller('deal')
export class DealController {
    constructor(private readonly dealService: DealService) {}
    @Get()
    async getAll(@Body() allData: UpdatePurchaseDto): Promise<Purchase[]> {
        return this.dealService.getAll(allData);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveTransaction(@Body() purschaseData: PurchaseCreateDto[]): Promise<Purchase[]>{
        return this.dealService.saveTransaction(purschaseData);
    }

    @Patch('/:email')
    @HttpCode(HttpStatus.OK)
    async updateDeliver(@Param('email') consumer_email: string, @Body() updateData: UpdatePurchaseDto): Promise<Purchase>{
        return this.dealService.updatePurchase(consumer_email, updateData)
    }

    @Delete('delete')
    async deletePurchase(@Body() deleteData: UpdatePurchaseDto){
        return this.dealService.deletePurchase(deleteData);
    }

    // @Get('search')
    // @HttpCode(HttpStatus.OK)
    // async searchPurchase(@Query('q') query: string): Promise<Purchase[]> {
    //     return this.
    // }
    
}
