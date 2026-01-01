import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList
} from "../controllers/productController.js";

const productRouter = express.Router();

// Add product (seller only)
productRouter.post(
  "/add",
  authSeller,
  upload.array("images"),
  addProduct
);

// Get all products (public)
productRouter.get("/list", productList);

// Get single product by ID (public)
productRouter.get("/:id", productById);

// Change product stock (seller only)
productRouter.post("/stock", authSeller, changeStock);

export default productRouter;
