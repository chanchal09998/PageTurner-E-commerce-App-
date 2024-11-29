import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="child-container">{children}</div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
