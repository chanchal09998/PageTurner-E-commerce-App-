import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AdminAuthModel from "../models/AdminModel.js";
dotenv.config();

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminAuthModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist, please signup" });
    }
    const matchpassword = await bcrypt.compare(password, user.password);
    if (!matchpassword) {
      return res.json({ message: "invalid credentials" });
    }
    const token = jwt.sign({ email }, process.env.json_secret_key);
    res.status(201).json({
      message: "success",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
