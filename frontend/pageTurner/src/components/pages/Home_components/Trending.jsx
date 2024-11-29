import React from "react";
import "./Trending.css";
import { useNavigate } from "react-router-dom";

const Trending = ({ book }) => {
  const navigate = useNavigate();
  const showDetails = () => {
    navigate(`/productdetails/${book._id}`);
  };
  return (
    <>
      <div className="trending-circle" onClick={showDetails}>
        <img src={book.imageUrl} />
      </div>
    </>
  );
};

export default Trending;
