import express from "express";
import {createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder} from "../controllers/order";

const orderRoute = express.Router();


orderRoute.get("/", getAllOrders)

orderRoute.get("/:id", getOrderById)

orderRoute.post("/", createOrder)

orderRoute.put("/:id", updateOrder)

orderRoute.delete("/:id", deleteOrder)


export default orderRoute;