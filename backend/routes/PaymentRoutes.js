import express from "express";
import {
  paymentController,
  verifyPayment,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment/create-order", paymentController);
paymentRouter.post("/payment/verify-payment", verifyPayment);

export default paymentRouter;
