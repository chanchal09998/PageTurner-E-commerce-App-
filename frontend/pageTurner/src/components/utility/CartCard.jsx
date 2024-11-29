import React, { useState } from "react";
import "./CartCard.css";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "../redux_Store/actionsCreators/cartActions";
const CartCard = ({ book }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleRemove = () => {
    console.log("removing from cart");
    dispatch(removeFromCart(book._id));
  };
  const increaseQuantity = () => {
    const newQuantity = quantity + 1; // Calculate the new quantity first
    setQuantity(newQuantity);
    dispatch(updateQuantity(book._id, newQuantity));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1; // Calculate the new quantity first
      setQuantity(newQuantity);
      dispatch(updateQuantity(book._id, newQuantity));
    }
  };
  return (
    <>
      <div className="book-item">
        <div className="img-container">
          <img src={book.imageUrl} alt={book.title} />
          <br />
        </div>
        <div className="quantity-container">
          <div className="book-info">
            <p>
              name:
              <br />
              <span>{book.title}</span>
            </p>
            <p>
              author: <br />
              <span>{book.author}</span>
            </p>
          </div>
          <div className="quantity">
            <button className="minus" onClick={decreaseQuantity}>
              -
            </button>
            <div className="quantity-index">{quantity}</div>

            <button className="add" onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>
        <div className="remove-from-cart-container">
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
      <div className="total-price">
        Total:<span>$ {book.price * quantity}</span>
      </div>
    </>
  );
};

export default CartCard;
