// 🔹 Load env FIRST (critical)
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

// 🔹 Connect services BEFORE starting server
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    // Allow multiple origins (local + deployed)
    const allowedOrigins = [
      'http://localhost:5173',
      'https://fresh-basket-mu.vercel.app'
    ];

    app.use(cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true
    }));

    // Stripe webhook (RAW body)
    app.post(
      '/stripe',
      express.raw({ type: 'application/json' }),
      stripeWebhooks
    );

    // Middleware
    app.use(express.json());
    app.use(cookieParser());

    // Routes
    app.get('/', (req, res) => res.send('API is working'));
    app.use('/api/user', userRouter);
    app.use('/api/seller', sellerRouter);
    app.use('/api/product', productRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/address', addressRouter);
    app.use('/api/order', orderRouter);

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ Server failed to start:', error.message);
    process.exit(1);
  }
};

// 🔹 Start app
startServer();
