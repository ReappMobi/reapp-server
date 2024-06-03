export type PaymentIntent = {
  userId: number;
  price: number;
  description: string;
  institutionId?: number;
  projectId?: number;
};
