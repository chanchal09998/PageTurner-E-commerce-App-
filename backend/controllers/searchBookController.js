import Book from "../models/Book_model.js";

export const searchBookController = async (req, res) => {
  console.log("Search book initiated");
  const { name } = req.body;

  try {
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Book name is required." });
    }

    const searchWords = name.split(" ").map((word) => new RegExp(word, "i"));

    const books = await Book.find({
      $or: [
        { title: { $regex: name, $options: "i" } }, // Partial title match
        { author: { $regex: name, $options: "i" } }, // Partial author match
      ],
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found." });
    }

    // Add a default image URL if books lack an image
    const defaultImageUrl = "http://localhost:3000/images/featured.png";
    const booksWithImage = books.map((book) => ({
      ...book.toObject(),
      imageUrl: book.imageUrl || defaultImageUrl,
    }));

    res.status(200).json(booksWithImage);
  } catch (error) {
    console.error("Error searching for book:", error);
    res.status(500).json({ message: "Error searching for book", error });
  }
};
