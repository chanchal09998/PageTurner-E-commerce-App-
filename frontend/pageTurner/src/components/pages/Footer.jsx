import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-section about">
            <h3>About Page Turner</h3>
            <p>
              Page Turner is your go-to online bookstore offering a wide variety
              of books from different genres. We aim to provide a seamless
              book-buying experience.
            </p>
          </div>

          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/faq">FAQs</a>
              </li>
              <li>
                <a href="/policy">Return Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: support@pageturner.com</p>
            <p>Phone: +123-456-7890</p>
            <p>Address: 123 Book Street, Knowledge City</p>
          </div>

          <div className="footer-section newsletter">
            <h3>Newsletter</h3>
            <form>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Page Turner | All rights reserved
        </p>
        <div className="social-links">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
