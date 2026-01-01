import jwt from 'jsonwebtoken';

const authSeller = (req, res, next) => {
  try {
    const sellerToken = req.cookies?.sellerToken;

    // ❌ No token → not authorized
    if (!sellerToken) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized'
      });
    }

    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // ❌ Token valid but not seller
    if (tokenDecode.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({
        success: false,
        message: 'Not Authorized'
      });
    }

    // ✅ Authorized
    next();

  } catch (error) {
    // ❌ Invalid / expired token
    return res.status(401).json({
      success: false,
      message: 'Not Authorized'
    });
  }
};

export default authSeller;
