import { Inject, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AwsService {
    private s3: AWS.S3
    private bucketName = process.env.AWS_S3_BUCKET_NAME
    constructor(@Inject('AWS_S3') s3: S3) {
        this.s3 = s3;
    }
    
    async uploadFile(file: Express.Multer.File): Promise<string> {
        const params = {
          Bucket: this.bucketName,
          Key: `${Date.now()}-${file.originalname}`, // unique key for each file
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read', // to allow public access to the file
        };
    
        const data = await this.s3.upload(params).promise();
        return data.Location; // URL of the uploaded file
    }
}
