import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaOrder = new PrismaClient().order;

// Create  order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { clientId, items } = req.body;
    const order = await prismaOrder.create({
      data: {
        clientId: clientId,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity
          }))
        }
      }
    });

    res.status(201).json({ data: order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prismaOrder.findMany({
      include: {
        items: true
      }
    });
    res.status(200).json({ data: orders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get  order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await prismaOrder.findUnique({
      where: { id: orderId },
      include: {
        items: true
      }
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ data: order });
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// update  order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const { clientId, items } = req.body;
    const itemsData = items.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity
    }));
    const order = await prismaOrder.update({
      where: { id: orderId },
      data: {
        clientId,
        items: {
          deleteMany: {},
          connectOrCreate: itemsData.map((item:any) => ({
            where: { id: item.productId },
            create: item
          }))
        }
      },
    });

    res.status(200).json({ data: order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// delete  order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    await prismaOrder.delete({ where: { id: orderId } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
