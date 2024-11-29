import Bestseller_Book from "../../models/Bestseller_book_model.js";
import Book from "../../models/Book_model.js";
import Children_Book from "../../models/Children_book_model.js";
import Trending_Book from "../../models/trending_book_model.js";

export const fetchTrending = async (req, res) => {
  try {
    const TrendingBooks = await Trending_Book.find();
    const defaultImageUrl = "http://localhost:3000/images/trendings.png";

    const trendingbookWithImage = TrendingBooks.map((book) => {
      return {
        ...book.toObject(),
        imageUrl: defaultImageUrl, // Add the image URL
      };
    });
    res.json(trendingbookWithImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

export const fetchBestseller = async (req, res) => {
  try {
    const bestsellerBooks = await Bestseller_Book.find();
    const defaultImageUrl = "http://localhost:3000/images/best-seller.png";

    const bestsellerBookWithImage = bestsellerBooks.map((book) => {
      return {
        ...book.toObject(),
        imageUrl: defaultImageUrl, // Add the image URL
      };
    });
    res.json(bestsellerBookWithImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

export const fetchBook = async (req, res) => {
  try {
    const Books = await Book.find();
    const defaultImageUrl = "http://localhost:3000/images/featured.png";

    const bookWithImage = Books.map((book) => {
      return {
        ...book.toObject(),
        imageUrl: defaultImageUrl, // Add the image URL
      };
    });
    res.json(bookWithImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};
export const fetchChildrenBook = async (req, res) => {
  try {
    const childrenBook = await Children_Book.find();
    const defaultImageUrl = "http://localhost:3000/images/featured.png";

    const childrenbookWithImage = childrenBook.map((book) => {
      return {
        ...book.toObject(),
        imageUrl: defaultImageUrl, // Add the image URL
      };
    });
    res.json(childrenbookWithImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

export const fetchSuggestedBook = async (req, res) => {
  try {
    const { category, author } = req.query; // Use req.query for GET requests

    if (!category) {
      return res.status(400).json({
        message: "Category query parameter is required",
      });
    }
    const defaultImageUrl = "http://localhost:3000/images/featured.png";
    // Fetch books by category, limit to 10 results
    const suggestions = await Book.find({
      $or: [{ category: category }, { author: author }],
    }).limit(10);

    if (suggestions.length === 0) {
      return res.status(404).json({
        message: "No suggested books found for this category",
      });
    }
    const suggestedbookWithImage = suggestions.map((book) => {
      return {
        ...book.toObject(),
        imageUrl: defaultImageUrl, // Add the image URL
      };
    });
    res.status(200).json(suggestedbookWithImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
