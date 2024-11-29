import express from "express";
import { saveOrders } from "../controllers/Orders/saveOrder.js";
import { userOrders } from "../controllers/Orders/userOrders.js";

const OrderRouter = express.Router();

OrderRouter.post("/checkout/save-orders", saveOrders);
OrderRouter.post("/fetch/user-orders", userOrders);

export default OrderRouter;
