import express from "express";
import {createClient, getClientById, getAllClients, updateClient, deleteClient} from "../controllers/client";

const clientRoute = express.Router();


clientRoute.get("/", getAllClients)

clientRoute.get("/:id", getClientById)

clientRoute.post("/", createClient)

clientRoute.put("/:id", updateClient)

clientRoute.delete("/:id", deleteClient)


export default clientRoute;