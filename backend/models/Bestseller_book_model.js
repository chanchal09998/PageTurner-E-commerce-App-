import mongoose from "mongoose";

const BestsellerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  coverImage: { type: String },
  description: { type: String },
  publicationDate: { type: Date },
});

const Bestseller_Book = mongoose.model("Bestseller-Book", BestsellerSchema);

export default Bestseller_Book;
