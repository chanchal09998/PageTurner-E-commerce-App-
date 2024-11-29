import React from "react";
import "./BestSeller.css";
import { useNavigate } from "react-router-dom";

const BestSeller = ({ book }) => {
  const navigate = useNavigate();
  const showDetails = () => {
    navigate(`/productdetails/${book._id}`);
  };
  return (
    <>
      <div className="best-seller-container" onClick={showDetails}>
        <div className="img-container">
          <img src={book.imageUrl} alt="book title" />
        </div>
        <div className="book-info">
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </div>
      </div>
    </>
  );
};

export default BestSeller;
