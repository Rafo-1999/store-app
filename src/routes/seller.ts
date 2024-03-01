import express from "express";
import { getAllSellers,getSellerById,createSeller,updateSeller,deleteSeller } from "../controllers/seller";

const sellerRoute = express.Router();


sellerRoute.get("/", getAllSellers)

sellerRoute.get("/:id", getSellerById)

sellerRoute.post("/", createSeller)

sellerRoute.put("/:id", updateSeller)

sellerRoute.delete("/:id", deleteSeller)


export default sellerRoute;
