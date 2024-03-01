import express from "express";
import bodyParser from "body-parser";
import clientRoute from "./routes/client";
import sellerRoute from "./routes/seller";
import productRoute from "./routes/product"
import orderRoute from "./routes/order"
import paymentRoute from "./routes/payment";
import saleRoute from "./routes/sale";
const app = express();
const port = process.env.PORT;
import dotenv from 'dotenv';
dotenv.config();



app.use(bodyParser.json());

app.use("/client", clientRoute);
app.use("/seller", sellerRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/payment", paymentRoute);
app.use("/sale", saleRoute);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
