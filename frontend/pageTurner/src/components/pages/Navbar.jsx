import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import toast from "react-hot-toast";
import axios from "axios";
import { searchAnyBook } from "../redux_Store/actionsCreators/cartActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (URL)
  const [isToken, setIsToken] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [searchBookName, setSearchBookName] = useState("");
  const myCartState = useSelector((state) => state.cartReducer);
  const cartItemCount = myCartState.length;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, [isToken]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email === "chanchalbtps009@gmail.com") {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  }, [isToken]);

  const tokenHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItem");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    dispatch(clearCart());
  };

  const searchBook = async (e) => {
    e.preventDefault();

    if (!searchBookName.trim()) {
      toast.error("Please enter a book name.");
      return;
    }

    try {
      const { data: books } = await axios.post(
        "https://pageturner-e-commerce-app.onrender.com/home/user/search-book",
        { name: searchBookName }
      );

      if (!books || books.length === 0) {
        toast.error("No such book found.");
        return;
      }

      dispatch(searchAnyBook(books));
      navigate("/searched-book");
    } catch (error) {
      console.error("Error searching for book:", error);

      if (error.response?.status === 404) {
        toast.error("No such book found.");
      } else {
        toast.error("An error occurred while searching for the book.");
      }
    }
  };

  // Determine the active link based on the current URL
  const getActiveLink = (path) => {
    return location.pathname === path ? "borderBottom" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className={`navbar-brand fw-bold `} to={"/"}>
          Page Turner
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${getActiveLink("/")}`} to={"/"}>
                Home
              </Link>
            </li>
            {isToken ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${getActiveLink("/checkout")}`}
                    to={"/checkout"}
                  >
                    Cart{cartItemCount}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${getActiveLink("/user-details")}`}
                    to={"/user-details"}
                  >
                    Account ({localStorage.getItem("name")})
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={"/login"}
                    onClick={() => {
                      tokenHandler();
                    }}
                  >
                    Log out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${getActiveLink("/signup")}`}
                    to={"/signup"}
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${getActiveLink("/login")}`}
                    to={"/login"}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
            {isEmail && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${getActiveLink("/admin/dashboard")}`}
                  to={"/admin/dashboard"}
                >
                  Admin-Dashboard
                </Link>
              </li>
            )}
          </ul>
          <form className="d-flex" onSubmit={searchBook}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="enter book name"
              aria-label="Search"
              onChange={(e) => setSearchBookName(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
