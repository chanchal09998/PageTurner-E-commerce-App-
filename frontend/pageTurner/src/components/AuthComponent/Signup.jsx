import React, { useState } from "react";
import Layout from "../pages/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://pageturner-e-commerce-app.onrender.com/auth/signup",
        {
          name,
          email,
          password,
          security,
        }
      );
      console.log(data);
      toast.success("successfully signed up");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Sign up failed");
    }
  };
  return (
    <>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
          <h5 className=" text-center">Security Question</h5>
          <label htmlFor="security-question">
            What is your favorite sport?
          </label>
          <input
            type="text"
            id="security-question"
            name="security-question"
            value={security}
            required
            onChange={(e) => {
              setSecurity(e.target.value);
            }}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
