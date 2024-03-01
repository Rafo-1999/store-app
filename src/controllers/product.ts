import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaProduct = new PrismaClient().product;

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, weight, dailyDiscount } = req.body;
    const product = await prismaProduct.create({
      data: {
        name,
        price,
        weight,
        dailyDiscount,
      },
    });
    res.status(201).json({ data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prismaProduct.findMany();
    res.status(200).json({ data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const product = await prismaProduct.findUnique({
      where: { id: productId },
    });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json({ data: product });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update a product

const calculatePrice = (weight: number, pricePerKg: number): number => {
  return weight * pricePerKg;
};

const applyDailyDiscount = (price: number, discount: number): number => {
  const thresholdPrice = 100;
  if (price > thresholdPrice) {
    return price * (1 - discount / 100);
  } else {
    return price;
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const { name, price, weight, dailyDiscount } = req.body;
    const existingProduct = await prismaProduct.findUnique({
      where: { id: productId },
    });
    if (!existingProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    const calculatedPrice = calculatePrice(weight, existingProduct.price);
    const discountedPrice = applyDailyDiscount(calculatedPrice, dailyDiscount);
    const updatedProduct = await prismaProduct.update({
      where: { id: productId },
      data: {
        name: name || existingProduct.name,
        price: discountedPrice || existingProduct.price,
        weight: weight || existingProduct.weight,
        dailyDiscount: dailyDiscount || existingProduct.dailyDiscount,
      },
    });
    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const deletedProduct = await prismaProduct.delete({
      where: { id: productId },
    });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
