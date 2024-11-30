import React, { useEffect, useState } from "react";
import Layout from "../pages/Layout";
import "./Login.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://pageturner-e-commerce-app.onrender.com/api/auth/admin/login",
        {
          email,
          password,
        }
      );
      console.log(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      toast.success("logged in successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <Layout>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2> Admin Log In</h2>

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
    </Layout>
  );
};

export default AdminLogin;
