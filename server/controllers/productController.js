import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';

/* =========================
   ADD PRODUCT (SELLER)
   ========================= */
export const addProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required"
      });
    }

    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image' // ✅ fixed typo
        });
        return result.secure_url;
      })
    );

    await Product.create({
      ...productData,
      image: imagesUrl
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product"
    });
  }
};

/* =========================
   GET ALL PRODUCTS
   ========================= */
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
};

/* =========================
   GET PRODUCT BY ID
   ========================= */
export const productById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product"
    });
  }
};

/* =========================
   CHANGE STOCK (SELLER)
   ========================= */
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    await Product.findByIdAndUpdate(id, { inStock });

    return res.status(200).json({
      success: true,
      message: "Stock updated"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update stock"
    });
  }
};
