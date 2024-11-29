import React, { useEffect, useState } from "react";
import Layout from "../pages/Layout";
import "./Login.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../pages/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    const redirectPath = sessionStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      // Clear the stored path
      navigate(redirectPath); // Redirect to the original path
    } else {
      navigate("/"); // Default redirect to home if no path was stored
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      console.log(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      toast.success("Logged in successfully");
      setTimeout(() => {
        handleLogin();
      }, 2000);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred, please try again");
      }
    }
  };

  return (
    <>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Log In</h2>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login;
