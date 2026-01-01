import express from "express";
import authUser from "../middleware/authUser.js";
import authSeller from "../middleware/authSeller.js";
import {
  placeOrderCOD,
  placeOrderStripe,
  getUserOrders,
  getAllOrders
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Place order (Cash on Delivery)
orderRouter.post("/cod", authUser, placeOrderCOD);

// Place order (Stripe)
orderRouter.post("/stripe", authUser, placeOrderStripe);

// Get orders for logged-in user
orderRouter.get("/user", authUser, getUserOrders);

// Get all orders (seller/admin)
orderRouter.get("/seller", authSeller, getAllOrders);

export default orderRouter;
