import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux_Store/actionsCreators/cartActions";
import "./Card.css";

const Card = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to navigate to book details
  const showDetails = () => {
    navigate(`/productdetails/${book._id}`);
  };

  // Function to handle adding to cart
  const handleAddToCart = (e) => {
    console.log("Adding book to cart:", book); // Debugging line
    dispatch(addToCart(book));
    e.stopPropagation();
  };

  // checking if user is already logged in
  const tokenHandler = (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
      e.stopPropagation();
      return;
    }
    handleAddToCart(e);
  };

  return (
    <div className="book-card" onClick={showDetails}>
      <div className="image-container">
        <img src={book.imageUrl} alt={book.title} className="book-image" />
      </div>

      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <p className="author">by {book.author}</p>

        <div className="rating">
          <span>Rating: {book.rating}/5</span>
        </div>

        <div className="price">
          <span>Price: ${book.price}</span>
        </div>

        <div className="actions">
          {/* Stop event propagation when adding to cart */}
          <button className="add-now-btn" onClick={tokenHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
