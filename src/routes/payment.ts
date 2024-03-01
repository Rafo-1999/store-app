import express from "express";
import {processPayment} from "../controllers/payment";

const paymentRoute = express.Router();

paymentRoute.post("/", processPayment)
export default paymentRoute;