import express from "express";
import {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} from "../controllers/product";

const productRoute = express.Router();


productRoute.get("/", getAllProducts)

productRoute.get("/:id", getProductById)

productRoute.post("/", createProduct)

productRoute.put("/:id", updateProduct)

productRoute.delete("/:id", deleteProduct)


export default productRoute;