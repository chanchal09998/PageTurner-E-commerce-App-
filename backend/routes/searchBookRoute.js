import express from "express";
import { searchBookController } from "../controllers/searchBookController.js";

const searchBookRouter = express.Router();

searchBookRouter.post("/user/search-book", searchBookController);

export default searchBookRouter;
