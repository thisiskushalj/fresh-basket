import express from "express";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";
import {
  register,
  login,
  isAuth,
  logout
} from "../controllers/userController.js";

const userRouter = express.Router();

// Register user (with optional profile picture)
userRouter.post("/register", upload.single("profilePic"), register);

// Login user
userRouter.post("/login", login);

// Check user authentication
userRouter.get("/is-auth", authUser, isAuth);

// Logout user
userRouter.get("/logout", authUser, logout);

export default userRouter;
