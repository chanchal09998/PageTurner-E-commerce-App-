import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import "./Products.css";
import axios from "axios";
import Card from "../utility/Card";

const Products = () => {
  const [pageCount, setPageCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const FetchBookData = async () => {
    try {
      const { data } = await axios.get(
        "https://pageturner-e-commerce-app.onrender.com/home/database/books"
      );
      setBooks(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchBookData();
  }, []);
  useEffect(() => {
    if (books.length > 0) {
      // Calculate how many pages are needed (30 books per page)
      setPageCount(Math.ceil(books.length / 30));
    }
  }, [books]); // Trigger this effect whenever 'books' state changes

  console.log(pageCount);
  const currentBooks = books.slice((currentPage - 1) * 30, currentPage * 30);
  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
    return pages;
  };
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum); // Update current page state
  };
  const scrollToTop = () => {
    const element = document.getElementById("products-container");
    if (element) {
      window.scrollTo({
        top: 0, // Scrolls to the top of the container
        behavior: "smooth", // Adds smooth scrolling effect
      });
    }
  };
  return (
    <Layout>
      <div className="products-container" id="products-container">
        {currentBooks.map((book) => {
          return <Card book={book} key={book._id} />;
        })}
      </div>
      <div className="page-numbers">
        {getPageNumbers().map((pageNum) => (
          <PaginationBtn
            key={pageNum}
            count={pageNum}
            onClick={() => {
              handlePageChange(pageNum);
              scrollToTop();
            }}
          />
        ))}
      </div>
    </Layout>
  );
};

export const PaginationBtn = ({ count, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{count}</button>
    </>
  );
};

export default Products;
