import { Injectable } from '@nestjs/common';
import { PurchaseCreateDto } from './dto/purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Photo } from 'src/photo/entities/photo.entity';
import { User } from 'src/auth/entities/user.entity';
import { UpdatePurchaseDto } from './dto/updatePurchase.dto';

@Injectable()
export class DealService {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>,
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getAll(allData: UpdatePurchaseDto): Promise<Purchase[]> {
        const allPurchase = await this.purchaseRepository.find({where: {consumer_email: allData.consumer_email}})
        return allPurchase.map(purchase => ({
            photo_id: purchase.photo_id,
            consumer_email: purchase.consumer_email,
            is_delivered: purchase.is_delivered,
            photo: purchase.photo,
            consumer: purchase.consumer
        }))

    }
    
    async saveTransaction(purschaseData: PurchaseCreateDto[]): Promise<Purchase[]>{
        const purchases: Purchase[] = [];

        for(const data of purschaseData) {
            const photo = await this.photoRepository.findOne({where: {photo_id: data.photo_id}})
            const consumer = await this.userRepository.findOne({where: {email: data.consumer_email}});

            if(!photo || !consumer){
                throw new Error('Photo or Consumer not found');
            }

            const purchase = this.purchaseRepository.create({
                photo_id: data.photo_id,
                consumer_email: data.consumer_email,
                photo,
                consumer,
                is_delivered: data.is_delivered,
            });

            purchases.push(purchase)
        }

        return await this.purchaseRepository.save(purchases);
    }

    async updatePurchase(consumer_email: string, updateData: UpdatePurchaseDto): Promise<Purchase>{
        const purchase = await this.purchaseRepository.findOne({where: {consumer_email: updateData.consumer_email, photo_id: updateData.photo_id}});
        const newPurchase = this.purchaseRepository.merge(purchase, updateData);
        const result = await this.purchaseRepository.save(newPurchase);
        return result;
    }

    async deletePurchase(deleteData: UpdatePurchaseDto): Promise<boolean>{
        const purchase = await this.purchaseRepository.findOne({where: {consumer_email: deleteData.consumer_email, photo_id: deleteData.photo_id}});
        await this.purchaseRepository.delete(purchase);
        return true;
    }

    async searchPurchase(query: string): Promise<Purchase[]>{
        const purchases = await this.purchaseRepository.find({
            where: [
                { consumer_email: Like(`%${query}%`) },
                { photo: { pictured_by: Like(`%${query}%`)}},
                { photo: { filename: Like(`%${query}%`)}},
                { photo: { tags: Like(`%${query}%`)}}
            ],
            relations: ["photo"],
        })
        return purchases;
    }
}
