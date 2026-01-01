import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Stripe from "stripe";

/* =========================
   PLACE ORDER (COD)
   ========================= */
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from auth middleware
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data"
      });
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% charges
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD"
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to place order"
    });
  }
};

/* =========================
   PLACE ORDER (STRIPE)
   ========================= */
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id; // ✅
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data"
      });
    }

    let productData = [];
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity
      });

      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online"
    });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.floor(item.price * 1.02) * 100
      },
      quantity: item.quantity
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId
      }
    });

    return res.status(200).json({
      success: true,
      url: session.url
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Stripe checkout failed"
    });
  }
};

/* =========================
   STRIPE WEBHOOK
   ========================= */
export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { orderId, userId } = session.metadata;

    await Order.findByIdAndUpdate(orderId, { isPaid: true });
    await User.findByIdAndUpdate(userId, { cartItems: {} });
  }

  response.json({ received: true });
};

/* =========================
   GET USER ORDERS
   ========================= */
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // ✅

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
};

/* =========================
   GET ALL ORDERS (SELLER)
   ========================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
};
