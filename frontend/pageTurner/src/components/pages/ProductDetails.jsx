import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import "./ProductDetails.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux_Store/actionsCreators/cartActions";
import Card from "../utility/Card";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [bookData, setBookData] = useState([]);

  const fetchBookDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://pageturner-e-commerce-app.onrender.com/details/bookdetails/${id}`
      );
      setBook(data);
      console.log(data); // Set the fetched book data
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const suggestedBooks = async () => {
    try {
      const { data } = await axios.get(
        "https://pageturner-e-commerce-app.onrender.com/home/database/suggested",
        {
          params: { category: book.category, author: book.author }, // Send as query parameter
        }
      );
      setBookData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTop = () => {
    const element = document.getElementById("product-details-container");
    if (element) {
      window.scrollTo({
        top: 0, // Scrolls to the top of the container
        behavior: "smooth", // Adds smooth scrolling effect
      });
    }
  };
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
  useEffect(() => {
    const fetchData = async () => {
      await fetchBookDetails(); // Fetch the book details first
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (book) {
      // Only fetch suggested books if `book` is not null
      suggestedBooks();
    }
  }, [book]); // Run this effect when `book` changes

  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <Layout className="detail-container">
      <div className="product-details-container" id="product-details-container">
        <div className="img-carousel-container">
          <Carousel showThumbs={true} swipeable={true}>
            <div>
              <img src={book.imageUrl} alt={book.title} />
            </div>
            <div>
              <img src={book.imageUrl} alt={book.title} />
            </div>
            <div>
              <img src={book.imageUrl} alt={book.title} />
            </div>
            <div>
              <img src={book.imageUrl} alt={book.title} />
            </div>
          </Carousel>
        </div>
        <div className="details-container">
          <div className="name-and-author">
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
          </div>
          <div className="price-and-rating">
            <h2>
              $ {book.price}
              <span>
                <del> $ 100</del>
              </span>
            </h2>
            <h5>ratings {book.rating}/5</h5>
          </div>
          <div className="description">
            <p>The Narrative</p>
            {book.description}
          </div>
          <div className="add-to-cart">
            <button onClick={tokenHandler}>Add To Cart</button>
            <p>Excpected delivery within 4 days</p>
          </div>
          <div className="extra-details">
            <h3>book details</h3>
            <ul>
              <li>
                <span>name </span>
                <span>:</span>
                <span>{book.title}</span>
              </li>
              <li>
                <span>language </span>
                <span>:</span>
                <span>English</span>
              </li>
              <li>
                <span>pages </span>
                <span>:</span>
                <span>574</span>
              </li>
              <li>
                <span>genre </span>
                <span>:</span>
                <span>{book.category}</span>
              </li>
              <li>
                <span>date of publishing </span>
                <span>:</span>
                <span>
                  {new Date(book.publicationDate).toLocaleDateString()}
                </span>
              </li>
              <li>
                <span>publication </span>
                <span>:</span>
                <span>publication name</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h3 className="suggestion-text">Suggestions</h3>
      <div className="suggestions" onClick={scrollToTop}>
        {bookData.map((book) => (
          <Card book={book} key={book._id} />
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
