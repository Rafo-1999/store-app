import express from "express";
import {createSale, getSaleById, getAllSales, updateSale, deleteSale} from "../controllers/sale";

const saleRoute = express.Router();


saleRoute.get("/", getAllSales)

saleRoute.get("/:id", getSaleById)

saleRoute.post("/", createSale)

saleRoute.put("/:id", updateSale)

saleRoute.delete("/:id", deleteSale)


export default saleRoute;