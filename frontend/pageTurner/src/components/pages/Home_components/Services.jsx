import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <>
      <div className="feature-card">
        <h3>7-Day Return Policy</h3>
        <p>Hassle-free returns within 7 days of purchase.</p>
      </div>
      <div className="feature-card">
        <h3>Cash on Delivery</h3>
        <p>Pay for your items when they arrive at your doorstep.</p>
      </div>
      <div className="feature-card">
        <h3>Discounts & Offers</h3>
        <p>Exclusive discounts and special offers just for you.</p>
      </div>
      <div className="feature-card">
        <h3>Free Shipping</h3>
        <p>Enjoy free shipping on orders above a certain amount.</p>
      </div>
    </>
  );
};

export default Services;
