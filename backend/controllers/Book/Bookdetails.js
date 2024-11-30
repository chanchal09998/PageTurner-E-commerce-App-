import Bestseller_Book from "../../models/Bestseller_book_model.js";
import Book from "../../models/Book_model.js";
import Children_Book from "../../models/Children_book_model.js";
import Trending_Book from "../../models/Trending_book_model.js";

const fetchBookDetails = async (req, res) => {
  const id = req.params.id;

  let bookdetail;

  // Search in each model based on the id
  bookdetail = await Book.findById(id);
  if (!bookdetail) {
    bookdetail = await Trending_Book.findById(id);
  }
  if (!bookdetail) {
    bookdetail = await Children_Book.findById(id);
  }
  if (!bookdetail) {
    bookdetail = await Bestseller_Book.findById(id);
  }

  const defaultImageUrl =
    "https://pageturner-e-commerce-app.onrender.com/images/featured.png";

  if (bookdetail) {
    const bookWithImage = {
      ...bookdetail.toObject(),
      imageUrl: defaultImageUrl,
    };
    res.json(bookWithImage);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

export default fetchBookDetails;
