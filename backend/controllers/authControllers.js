import AuthModel from "../models/AuthModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const Signup = async (req, res) => {
  try {
    const { name, email, password, security } = req.body;
    const user = await AuthModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User does not exist, please signup" });
    }

    const HashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthModel({
      name,
      email,
      password: HashedPassword,
      security,
    });

    await newUser.save();

    res.status(201).json({
      message: "success",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res
        .status(404) // Use 404 status for "not found"
        .json({ message: "User does not exist, please signup" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(401) // Use 401 status for "unauthorized" access
        .json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, process.env.json_secret_key, {
      expiresIn: "24h",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" }); // Handle server errors
  }
};
