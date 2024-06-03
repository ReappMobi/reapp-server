import {
  PaymentServiceIntentType,
  handlePayment,
  getPayment,
} from '@services/payment';
import prisma from '@services/client';
import { PaymentIntent } from './payment.types';

export class PaymentService {
  public async requestPaymentInstitutionUrl(intent: PaymentIntent) {
    const donnor = await prisma.donnor.findUnique({
      where: {
        id: intent.userId,
      },
    });

    if (!donnor) {
      throw new Error('Usuário não encontrado');
    }

    let data: PaymentServiceIntentType;
    let institution;
    let project;

    if (intent.institutionId) {
      institution = await prisma.institution.findUnique({
        where: {
          id: intent.institutionId,
        },
      });
      if (institution) {
        data = {
          title: institution?.name,
          description: intent.description,
          price: intent.price,
          username: donnor?.name,
          userEmail: donnor?.email,
        };
      } else {
        throw new Error('Instituição não encontrada');
      }
    } else if (intent.projectId) {
      project = await prisma.project.findUnique({
        where: {
          id: intent.projectId,
        },
      });

      if (project) {
        data = {
          title: project.name,
          description: intent.description,
          price: intent.price,
          username: donnor?.name,
          userEmail: donnor?.email,
        };
      } else {
        throw new Error('Projeto não encontrado');
      }
    } else {
      //é uma doação geral
      data = {
        title: 'Reapp',
        description: intent.description,
        price: intent.price,
        username: donnor?.name,
        userEmail: donnor?.email,
      };
    }

    const response = await handlePayment(data);

    if (response && response.init_point && response.external_reference) {
      await prisma.donationIntent.create({
        data: {
          donorId: donnor.id,
          amount: intent.price,
          status: 'pending',
          institutionId: institution?.id,
          projectId: project?.id,
          checkoutUrl: response.init_point,
          paymentId: response.external_reference,
        },
      });
      return response.init_point;
    } else {
      throw new Error('Erro no processamento da requisição');
    }
  }

  public async paymentCallback(data: { data: { id: string } }): Promise<void> {
    if (data?.data?.id) {
      const payment = await getPayment(data.data.id);

      if (payment) {
        const intentPayment = await prisma.donationIntent.findFirst({
          where: { paymentId: payment.external_reference },
        });

        if (intentPayment) {
          const statusUpdate =
            payment.status === 'approved'
              ? 'approved'
              : payment.status === 'pending'
                ? 'pending'
                : payment.status === 'rejected'
                  ? 'rejected'
                  : intentPayment.status;

          if (statusUpdate !== intentPayment.status) {
            await prisma.donationIntent.update({
              where: { id: intentPayment.id },
              data: { status: statusUpdate },
            });

            if (statusUpdate === 'approved') {
              await prisma.donation.create({
                data: {
                  donorId: intentPayment.donorId,
                  amount: Number(intentPayment.amount),
                  institutionId: intentPayment.institutionId,
                  projectId: intentPayment.projectId,
                  date: new Date(),
                },
              });
            }
          }
        }
      }
    }
  }
}
