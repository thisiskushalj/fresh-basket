import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  // ✅ Allow preflight
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const tokenDecode = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.body = req.body || {};
    req.body.userId = tokenDecode.id;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
};

export default authUser;
