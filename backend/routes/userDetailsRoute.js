import express from "express";
import { userDetails } from "../controllers/fetchUserDetails.js";

const userRouter = express.Router();

// Route for fetching user details and orders
userRouter.post("/fetch/user-details", userDetails);

export default userRouter;
