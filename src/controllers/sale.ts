import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaSale = new PrismaClient().sale;

// create a new sale
export const createSale = async (req: Request, res: Response) => {
  try {
    const { sellerId, clientId, products } = req.body;
    const sale = await prismaSale.create({
      data: {
        sellerId,
        clientId,
        products: {
          create: products.map((product: any) => ({
            productId: product.id,
            quantity: product.quantity
          }))
        }
      },
      include: {
        seller: true,
        client: true
      }
    });

    res.status(201).json({ data: sale });
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get all sales
export const getAllSales = async (req: Request, res: Response) => {
  try {
    const sales = await prismaSale.findMany({
      include: {
        products: true,
        saleItems: true
      }
    });
    res.status(200).json({ data: sales });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get a single sale by ID
export const getSaleById = async (req: Request, res: Response) => {
  try {
    const saleId = Number(req.params.id);
    const sale = await prismaSale.findUnique({
      where: { id: saleId },
      include: {
        products: true,
        saleItems: true
      }
    });
    if (!sale) {
      res.status(404).json({ error: 'Sale not found' });
    } else {
      res.status(200).json({ data: sale });
    }
  } catch (error) {
    console.error('Error fetching sale by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// update a sale
export const updateSale = async (req: Request, res: Response) => {
  try {
    const saleId = Number(req.params.id);
    const { sellerId, clientId, products, saleItems } = req.body;
    const sale = await prismaSale.update({
      where: { id: saleId },
      data: {
        sellerId,
        clientId,
        products: { create: products },
        saleItems: { create: saleItems }
      }
    });
    res.status(200).json({ data: sale });
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// delete a sale
export const deleteSale = async (req: Request, res: Response) => {
  try {
    const saleId = Number(req.params.id);
    await prismaSale.delete({ where: { id: saleId } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
