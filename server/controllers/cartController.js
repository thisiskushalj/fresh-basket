import User from "../models/User.js";

// Update User Cart Data : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;          // ✅ from auth middleware
    const { cartItems } = req.body;

    await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cart Updated"
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update cart"
    });
  }
};
