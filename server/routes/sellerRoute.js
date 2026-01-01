import express from "express";
import authSeller from "../middleware/authSeller.js";
import {
  sellerLogin,
  isSellerAuth,
  sellerLogout
} from "../controllers/sellerController.js";

const sellerRouter = express.Router();

// Seller login
sellerRouter.post("/login", sellerLogin);

// Check seller authentication
sellerRouter.get("/is-auth", authSeller, isSellerAuth);

// Seller logout
sellerRouter.get("/logout", authSeller, sellerLogout);

export default sellerRouter;
