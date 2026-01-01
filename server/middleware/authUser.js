import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized'
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // ❌ Invalid token
    if (!tokenDecode?.id) {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized'
      });
    }

    // ✅ Attach user safely
    req.user = { id: tokenDecode.id };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not Authorized'
    });
  }
};

export default authUser;
