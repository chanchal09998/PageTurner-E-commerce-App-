import express from "express";
import {
  fetchBestseller,
  fetchBook,
  fetchChildrenBook,
  fetchSuggestedBook,
  fetchTrending,
} from "../controllers/Database/DatabaseControllers.js";

const dbrouter = express.Router();

dbrouter.get("/database/trending", fetchTrending);
dbrouter.get("/database/bestseller", fetchBestseller);
dbrouter.get("/database/books", fetchBook);
dbrouter.get("/database/children", fetchChildrenBook);
dbrouter.get("/database/suggested", fetchSuggestedBook);

export default dbrouter;
