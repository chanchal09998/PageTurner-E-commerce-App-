import express from "express";
import fetchBookDetails from "../controllers/Book/Bookdetails.js";

const bookRouter = express.Router();

bookRouter.get("/bookdetails/:id", fetchBookDetails);

export default bookRouter;
