import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  // ✅ Allow CORS preflight to pass
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const sellerToken = req.cookies?.sellerToken;

    if (!sellerToken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const tokenDecode = jwt.verify(
      sellerToken,
      process.env.JWT_SECRET
    );

    if (tokenDecode.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized",
      });
    }

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
};

export default authSeller;
