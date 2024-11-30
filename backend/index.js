import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/AuthRoutes.js";
import dbrouter from "./routes/DatabaseRoute.js";
import bookRouter from "./routes/BookRouter.js";
import paymentRouter from "./routes/PaymentRoutes.js";
import adminRouter from "./routes/AdminRoutes.js";
import OrderRouter from "./routes/OrdersRoutes.js";
import userRouter from "./routes/userDetailsRoute.js";
import searchBookRouter from "./routes/searchBookRoute.js";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", router);
app.use("/home", dbrouter);
app.use("/details", bookRouter);
app.use("/api", paymentRouter);
app.use("/admin", adminRouter);
app.use("/api", OrderRouter);
app.use("/api", userRouter);
app.use("/home", searchBookRouter);
app.use("/images", express.static("public/images"));

const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Hello, World! This is your Express app connected to MongoDB.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
