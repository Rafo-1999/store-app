import  {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient().seller;



// get all sellers
export const getAllSellers= async (req:Request, res:Response) => {
  try {
    const allSellers = await prismaClient.findMany({});
    res.status(200).json({ data: allSellers });
  } catch (error) {
    console.error("Error fetching all sellers:", error);
    res.status(500).json({ error: 'Failed to fetch sellers' });
  }
}

// Get seller by ID
export const getSellerById= async (req:Request, res:Response) => {
  try {
    const sellerId = Number(req.params.id);
    const seller = await prismaClient.findUnique({
      where: {
        id: sellerId
      }
    });
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.status(200).json({ data: seller });
  } catch (error) {
    console.error("Error fetching seller by ID:", error);
    res.status(500).json({ error: 'Failed to fetch seller by ID' });
  }
}

// Create seller
export const createSeller= async (req:Request, res:Response) => {
  try {
    const sellerData = req.body;
    const createSeller = await prismaClient.create({
      data: sellerData,
    });
    res.status(201).json({ data: createSeller });
  } catch (error) {
    console.error("Error creating seller:", error);
    res.status(500).json({ error: 'Failed to create seller' });
  }
}

// Update seller
export const updateSeller= async (req:Request, res:Response) => {
  try {
    const sellerId = Number(req.params.id);
    const sellerData = req.body;

    const existingSeller = await prismaClient.findUnique({
      where: {
        id: sellerId
      }
    });

    if (!existingSeller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    const updatedSeller = await prismaClient.update({
      where: {
        id: sellerId
      },
      data: sellerData,
    });

    res.status(200).json({ data: updatedSeller });
  } catch (error) {
    console.error("Error updating seller:", error);
    res.status(500).json({ error: 'Failed to update seller' });
  }
}
// Delete seller
export const deleteSeller= async (req:Request, res:Response) => {
  try {
    const sellerId = Number(req.params.id);

    const existingSeller = await prismaClient.findUnique({
      where: {
        id: sellerId
      }
    });

    if (!existingSeller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    await prismaClient.delete({
      where: {
        id: sellerId
      }
    });

    res.status(200).json({ message: 'Seller deleted successfully' });
  } catch (error) {
    console.error("Error deleting seller:", error);
    res.status(500).json({ error: 'Failed to delete seller' });
  }
}


