import Book from "../../models/Book_model.js";
import OrderModel from "../../models/OrderModel.js";

export const totalBooks = async (req, res) => {
  try {
    const totalBooks = await Book.find();
    res.json(totalBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching total books", error });
  }
};

export const searchBook = async (req, res) => {
  console.log("searchbook intiated");
  const { name } = req.body;
  try {
    const searchWords = name.split(" ").map((word) => new RegExp(word, "i"));
    const books = await Book.find({
      $or: [
        { title: { $all: searchWords } },
        { author: { $all: searchWords } },
      ],
    });

    if (books.length > 0) {
      res.json(books); // Return array of books that match the search term
    } else {
      res.status(404).json({ message: "No books found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error searching for book", error });
  }
};

export const deleteBook = async (req, res) => {
  const { _id } = req.body;
  try {
    const deletedBook = await Book.findByIdAndDelete(_id);
    if (deletedBook) {
      res.json({ message: "Book deleted successfully", deletedBook });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting the book", error });
  }
};

export const updateAndUploadBook = async (req, res) => {
  const {
    title,
    author,
    rating,
    price,
    category,
    stock,
    description,
    publicationDate,
  } = req.body;

  try {
    let book = await Book.findOne({ title });
    if (book) {
      // Update book
      book = await Book.findByIdAndUpdate(
        book._id,
        {
          title,
          author,
          rating,
          price,
          category,
          stock,
          description,
          publicationDate,
        },
        { new: true }
      );
      res.json({ message: "Book updated successfully", book });
    } else {
      // Add new book
      const newBook = new Book({
        title,
        author,
        rating,
        price,
        category,
        stock,
        description,
        publicationDate, // Use consistent naming
      });
      await newBook.save();
      res.json({ message: "Book added successfully", newBook });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding or updating the book", error });
  }
};

export const fetchAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({
      success: true,
      allOrders: orders, // Return all orders
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const approveOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // Extract the order ID from the URL
    console.log("Order ID received:", orderId);

    // Update the specific order's status within the orders array
    const result = await OrderModel.findOneAndUpdate(
      { "orders._id": orderId }, // Match the order by its unique ID within the nested array
      { $set: { "orders.$.orderStatus": "approved" } }, // Update the specific order's status
      { new: true } // Return the updated document
    );

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order approved",
      updatedOrder: result,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
