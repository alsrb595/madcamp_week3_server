import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  private secretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';

  async confirmPayment(paymentKey: string, orderId: string, amount: number) {
    const encryptedSecretKey = 'Basic ' + Buffer.from(this.secretKey + ':').toString('base64');
    try {
      const response = await axios.post('https://api.tosspayments.com/v1/payments/confirm', {
        orderId,
        amount,
        paymentKey,
      }, {
        headers: {
          Authorization: encryptedSecretKey,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(JSON.stringify(error.response.data));
      } else {
        throw new Error(error.message);
      }
    }
  }
}
