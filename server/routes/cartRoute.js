import express from "express";
import authUser from "../middleware/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

// Update user cart
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
