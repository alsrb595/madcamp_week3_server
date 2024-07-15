// src/aws/aws.module.ts
import { Module } from '@nestjs/common';
import { S3 } from 'aws-sdk'; //AWS SDK에서 S3 클라이언트를 가져옴. 이 클라이언트를 사용하여 AWS S3와 상호작용이 가능해짐
import { AwsService } from './aws.service';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  providers: [
    {
      provide: 'AWS_S3', // Provider가 AWS_S3 토큰으로 식별되는 것을 의미한다. 이 토큰을 사용하여 다른 모듈이나 서비스에서 이 제공자를 주입 받을 수 있음

      //useFactory: () => {}: 팩토리 함수, 새로운 인스턴스를 생성할 때 호출됨
      useFactory: () => { 
        return new S3({ // 새로운 S3 클라이언트 인스턴스를 생성하여 반환함
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION,
        });
      },
    },
    AwsService,
  ],
  exports: ['AWS_S3', AwsService], //AWS_S3 제공자로 외부로 eport 다른 모듈에서 이를 사용이 가능해짐
})
export class AwsModule {} // AwsModule 클래스를 정의하고 내보냅니다. 이 클래스는 AWS S3 서비스와 통합하기 위해 필요한 제공자를 포함한 모듈
