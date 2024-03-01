import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaPayment = new PrismaClient().payment;

export const processPayment = async (req: Request, res: Response) => {
  try {
    const { clientId, amount } = req.body;


    const paymentResult = await simulatePayment(clientId, amount);

    if (paymentResult.success) {
      await prismaPayment.create({
        data: {
          clientId,
          amount
        }
      });

      res.status(200).json({ success: true, message: 'Payment successful' });
    } else {
      res.status(400).json({ success: false, message: 'Payment failed',  });
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const simulatePayment = async (clientId: number, amount: number) => {

  return { success: true };
};
