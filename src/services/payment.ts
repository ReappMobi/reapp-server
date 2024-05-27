import { MercadoPagoConfig, Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_TEST!,
});

export type PaymentServiceIntentType = {
  title: string;
  username: string;
  userEmail: string;
  description: string;
  price: number;
};

export const handlePayment = async (intent: PaymentServiceIntentType) => {
  const preference = new Preference(client);
  const body = {
    items: [
      {
        id: uuidv4(),
        title: intent.title,
        description: intent.description,
        quantity: 1,
        currency_id: 'BRL',
        unit_price: intent.price,
      },
    ],
    payer: {
      name: intent.username,
      email: intent.userEmail,
    },
  };

  const response = await preference.create({
    body: body,
  });

  return response;
};
