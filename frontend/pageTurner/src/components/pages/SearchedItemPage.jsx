import React, { useState } from "react";
import "./SearchedItemPage.css";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import Card from "../utility/Card";

const SearchedItemPage = () => {
  const books = useSelector((state) => state.serchedBookReducer);
  console.log("from searchedItemPage", books);

  return (
    <Layout>
      <div className="products-container" id="products-container">
        {books.map((book, index) => {
          return <Card book={book} key={index} />;
        })}
      </div>
    </Layout>
  );
};

export default SearchedItemPage;
