import mongoose from "mongoose";

const childrenBookSchema = new mongoose.Schema({
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

const Children_Book = mongoose.model("Children-Book", childrenBookSchema);

export default Children_Book;
