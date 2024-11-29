import express from "express";
import {
  approveOrder,
  deleteBook,
  fetchAllOrders,
  searchBook,
  totalBooks,
  updateAndUploadBook,
} from "../controllers/Dashboard/AdminControllers.js";

const adminRouter = express.Router();

adminRouter.get("/dashboard/total-book", totalBooks);
adminRouter.post("/dashboard/search-book", searchBook);
adminRouter.post("/dashboard/delete-book", deleteBook);
adminRouter.post("/dashboard/add-book", updateAndUploadBook);
adminRouter.get("/dashboard/all-orders", fetchAllOrders);
adminRouter.put("/dashboard/approve-order/:orderId", approveOrder);

export default adminRouter;
