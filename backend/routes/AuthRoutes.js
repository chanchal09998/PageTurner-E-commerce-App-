import express from "express";
import {
  loginValidation,
  signupValidation,
} from "../middlewares/AuthMiddlewares.js";
import { Login, Signup } from "../controllers/authControllers.js";
import { AdminLogin } from "../controllers/adminLoginController.js";
const router = express.Router();

router.post("/signup", signupValidation, Signup);
router.post("/login", loginValidation, Login);
router.post("/admin/login", loginValidation, AdminLogin);

export default router;
