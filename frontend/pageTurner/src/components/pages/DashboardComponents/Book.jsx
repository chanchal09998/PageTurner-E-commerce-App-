import React, { useEffect, useState } from "react";
import "./Book.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Book = () => {
  // Edit field state management
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookRating, setBookRating] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookStock, setBookStock] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookPublication, setBookPublication] = useState("");

  const [totalBook, setTotalBook] = useState("");
  const [searchBookName, setSearchBookName] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [noBooksFound, setNoBooksFound] = useState(false);

  // Fetch total books
  const fetchTotalBook = async () => {
    try {
      const { data } = await axios.get(
        "https://pageturner-e-commerce-app.onrender.com/admin/dashboard/total-book"
      );
      const count = data.reduce((total) => total + 1, 0);
      setTotalBook(count);
    } catch (error) {
      toast.error("Error fetching total books");
    }
  };

  // Search for a book
  const searchBook = async () => {
    try {
      const { data: book } = await axios.post(
        "https://pageturner-e-commerce-app.onrender.com/admin/dashboard/search-book",
        { name: searchBookName }
      );
      setSearchedBook(book); // Set the searched books in state if found
      setNoBooksFound(false); // Reset the no books found state
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNoBooksFound(true); // Set no books found to true if 404 error
      } else {
        toast.error("Error searching for book");
      }
    }
  };

  // Edit book data
  const handleEdit = (book) => {
    setBookTitle(book.title);
    setBookAuthor(book.author);
    setBookRating(book.rating);
    setBookPrice(book.price);
    setBookCategory(book.category);
    setBookStock(book.stock);
    setBookDescription(book.description);
    setBookPublication(book.publicationDate);
    setSelectedBookId(book._id);
  };

  // Delete a book with confirmation
  const deleteBook = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        await axios.post(
          "https://pageturner-e-commerce-app.onrender.com/admin/dashboard/delete-book",
          {
            _id,
          }
        );
        toast.success("Book deleted successfully");
        fetchTotalBook(); // Refresh book count
        setSearchedBook((prevBooks) =>
          prevBooks.filter((book) => book._id !== _id)
        ); // Update search results
      } catch (error) {
        toast.error("Error deleting the book");
      }
    }
  };

  // Update or upload a book
  const updateAndUpload = async () => {
    try {
      const { data } = await axios.post(
        "https://pageturner-e-commerce-app.onrender.com/admin/dashboard/add-book",
        {
          title: bookTitle,
          author: bookAuthor,
          rating: bookRating,
          price: bookPrice,
          category: bookCategory,
          stock: bookStock,
          description: bookDescription,
          publicationDate: bookPublication,
        }
      );
      toast.success(
        selectedBookId ? "Book updated successfully" : "Book added successfully"
      );
      fetchTotalBook(); // Refresh book count
    } catch (error) {
      toast.error("Error adding or updating the book");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateAndUpload();
  };

  useEffect(() => {
    fetchTotalBook();
  }, []);

  return (
    <>
      <div className="book-dashboard">
        <div className="total-books">
          <div className="book-infomation">
            <h3>TOTAL BOOKS</h3>
            <p>{totalBook}</p>
          </div>
        </div>
        <div className="search">
          <div className="search-book">
            <input
              type="text"
              placeholder="enter book name"
              value={searchBookName}
              onChange={(e) => setSearchBookName(e.target.value)}
            ></input>
            <button onClick={searchBook}>Search</button>
          </div>
          <div className="searched-book">
            {noBooksFound ? (
              <p>No books found</p>
            ) : (
              searchedBook && (
                <div>
                  {searchedBook.map((book, index) => (
                    <SearchedBookData
                      searchedBook={book}
                      key={index}
                      handleEdit={handleEdit}
                      deleteBook={deleteBook}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
        <div className="edit new-upload">
          <h3>{selectedBookId ? "Update Book" : "Add New Book"}</h3>
          <form onSubmit={handleSubmit} className="book-form">
            <label>
              Title:
              <input
                type="text"
                placeholder="Enter book title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </label>

            <label>
              Author:
              <input
                type="text"
                placeholder="Enter book author"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
              />
            </label>

            <label>
              Rating:
              <input
                type="number"
                placeholder="Enter book rating"
                value={bookRating}
                onChange={(e) => setBookRating(e.target.value)}
              />
            </label>

            <label>
              Price:
              <input
                type="text"
                placeholder="Enter book price"
                value={bookPrice}
                onChange={(e) => setBookPrice(e.target.value)}
              />
            </label>

            <label>
              Category:
              <input
                type="text"
                placeholder="Enter book category"
                value={bookCategory}
                onChange={(e) => setBookCategory(e.target.value)}
              />
            </label>

            <label>
              Stock:
              <input
                type="number"
                placeholder="Enter stock quantity"
                value={bookStock}
                onChange={(e) => setBookStock(e.target.value)}
              />
            </label>

            <label>
              Description:
              <textarea
                placeholder="Enter book description"
                value={bookDescription}
                onChange={(e) => setBookDescription(e.target.value)}
              />
            </label>

            <label>
              PublicationDate:
              <input
                type="text"
                placeholder="Enter book publication"
                value={bookPublication}
                onChange={(e) => setBookPublication(e.target.value)}
              />
            </label>

            <button type="submit">
              {selectedBookId ? "Update Book" : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Book;

export const SearchedBookData = ({ searchedBook, handleEdit, deleteBook }) => {
  const formattedDate = new Date(
    searchedBook.publicationDate
  ).toLocaleDateString();

  return (
    <div className="book-data">
      <p>
        <span className="label">Book ID:</span>
        {searchedBook._id}
      </p>
      <p>
        <span className="label">Title:</span>
        {searchedBook.title}
      </p>
      <p>
        <span className="label">Author:</span>
        {searchedBook.author}
      </p>
      <p>
        <span className="label">Rating:</span>
        {searchedBook.rating}
      </p>
      <p>
        <span className="label">Price:</span>${searchedBook.price}
      </p>
      <p>
        <span className="label">Category:</span>
        {searchedBook.category}
      </p>
      <p>
        <span className="label">Stock:</span>
        {searchedBook.stock}
      </p>
      <p>
        <span className="label">Description:</span>
        {searchedBook.description}
      </p>
      <p>
        <span className="label">Publication:</span>
        {formattedDate}
      </p>
      <div className="button-group">
        <button className="editbtn" onClick={() => handleEdit(searchedBook)}>
          Edit Book
        </button>
        <button
          className="deletebtn"
          onClick={() => deleteBook(searchedBook._id)}
        >
          Delete Book
        </button>
      </div>
    </div>
  );
};
