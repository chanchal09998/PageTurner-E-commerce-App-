import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import "./Home.css";
import hero_book from "../../../assets/hero_book.png";
import Trending from "./Home_components/Trending";
import BestSeller from "./Home_components/BestSeller";
import Review_Card from "./Home_components/Review_Card";
import { Link } from "react-router-dom";
import Card from "../utility/Card";
import Services from "./Home_components/Services";

const Home = () => {
  const [trendingBook, setTrendingBook] = useState([]);
  const [bestSellerBook, setbestSellerBook] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [childrenBook, setChildrenBook] = useState([]);
  const FetchTrendingData = async () => {
    try {
      const { data } = await axios.get(
        "https://pageturner-e-commerce-app.onrender.com/home/database/trending"
      );
      setTrendingBook(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const FetchBestsellerData = async () => {
    try {
      const { data } = await axios.get(
        "https://pageturner-e-commerce-app.onrender.com/home/database/bestseller"
      );
      setbestSellerBook(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const FetchBookData = async () => {
    try {
      const { data } = await axios.get(
        "https://pageturner-e-commerce-app.onrender.com/home/database/books"
      );
      setBookData(data.slice(0, 8));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const FetchChildrenData = async () => {
    try {
      const { data } = await axios.get(
        "https://pageturner-e-commerce-app.onrender.com/home/database/children"
      );
      setChildrenBook(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchTrendingData();
    FetchBestsellerData();
    FetchBookData();
    FetchChildrenData();
  }, []);
  return (
    <Layout>
      <div className="home-container">
        <section className="hero-section">
          <div className="left-text">
            <h1>
              Page<span>T</span>urner
            </h1>
            <p className="p1">
              Your gateway to captivating stories and timeless knowledge.
            </p>
            <p className="p2">
              Discover books that inspire, educate, and spark your imagination.
            </p>
            <button className="explore-btn">Explore Now</button>
            <small>Free shipping on orders over $50.</small>
          </div>

          <div className="right-img">
            <img src={hero_book} alt="Book Selve" />

            <div className="book-shadow"></div>
          </div>
        </section>
        <div className="trending-books">
          {trendingBook.map((book) => (
            <Trending book={book} key={book._id} />
          ))}
        </div>
        <div className="services">
          <Services />
        </div>
        <h3>Best Seller</h3>
        <div className="best-seller">
          {bestSellerBook.map((book) => (
            <BestSeller book={book} key={book._id} />
          ))}
        </div>
        <h3>Featured</h3>
        <div className="featured">
          {bookData.map((book) => (
            <Card book={book} key={book._id} />
          ))}
        </div>
        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <p className=" bg-info p-3 fw-bold   find-more">Find More</p>
        </Link>
        <h3>Children Favourite</h3>
        <div className="chidren-favourite">
          {childrenBook.map((book) => (
            <Card book={book} key={book._id} />
          ))}
        </div>
        <div className="reviews">
          <Review_Card />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
