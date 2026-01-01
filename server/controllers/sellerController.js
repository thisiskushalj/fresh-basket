import jwt from "jsonwebtoken";

// Login Seller
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.SELLER_EMAIL ||
      password !== process.env.SELLER_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: true,        // 🔥 MUST BE TRUE
      sameSite: "none",    // 🔥 MUST BE NONE
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
