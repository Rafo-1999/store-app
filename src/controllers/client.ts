import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prismaClient = new PrismaClient().client;


//get All Clients
export  const getAllClients=async (req:Request,res:Response)=>{
  try {
    const allClients=await prismaClient.findMany({

    });
    res.status(200).json({data:allClients})
  }catch (e){
    console.error("Error fetching all clients:", e);
    res.status(500).json({ error: 'Internal server error' });
  }
}


//get clientByID
export const getClientById = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id);
    const client = await prismaClient.findUnique({
      where: {
        id: clientId
      }
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json({ data: client });
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    res.status(500).json({ error: 'Failed to fetch client by ID' });
  }
};
//create client
export const createClient = async (req:Request, res:Response) => {
  try {
  const clientData=req.body;
  const createClient=await prismaClient.create({
    data:clientData,
  })
    res.status(201).json({data:createClient})
  }catch (e){
    console.error("Error creating client:", e);
    res.status(500).json({ error: 'Internal server error' });
  }

};


export const updateClient = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id);
    const clientData = req.body;

    const existingClient = await prismaClient.findUnique({
      where: {
        id: clientId
      }
    });

    if (!existingClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    if (clientData.email && clientData.email !== existingClient.email) {
      const conflictingClient = await prismaClient.findFirst({
        where: {
          email: clientData.email,
          NOT: {
            id: clientId
          }
        }
      });

      if (conflictingClient) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }

    const updatedClient = await prismaClient.update({
      where: {
        id: clientId
      },
      data: clientData,
    });

    res.status(200).json({ data: updatedClient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id);

    const existingClient = await prismaClient.findUnique({
      where: {
        id: clientId
      }
    });

    if (!existingClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await prismaClient.delete({
      where: {
        id: clientId
      }
    });

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
