import { PaymentServiceIntentType, handlePayment } from '@services/payment';
import prisma from '@services/client';
import { PaymentIntent } from './payment.types';

export class PaymentService {
  //TODO: tipar as funções
  public async requestPaymentInstitutionUrl(intent: PaymentIntent) {
    const donnor = await prisma.donnor.findUnique({
      where: {
        id: intent.userId,
      },
    });

    const institution = await prisma.institution.findUnique({
      where: {
        id: intent.institutionId,
      },
    });

    if (!institution || !donnor) {
      throw new Error('');
    }
    const data: PaymentServiceIntentType = {
      title: institution?.name,
      description: intent.description,
      price: intent.price,
      username: donnor?.name,
      userEmail: donnor?.email,
    };

    const response = await handlePayment(data);

    //const id = response.collector_id;
    //TODO: save data to get in payment callback
    return response.init_point;
  }

  /*
    public async paymentCallback(result: any){
        //TODO: save payment informations
    }

    */
}
