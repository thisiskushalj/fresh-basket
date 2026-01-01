import jwt from 'jsonwebtoken';

/* =========================
   LOGIN SELLER
   ========================= */
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.SELLER_EMAIL ||
      password !== process.env.SELLER_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('sellerToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};

/* =========================
   CHECK SELLER AUTH
   ========================= */
export const isSellerAuth = async (req, res) => {
  try {
    const token = req.cookies?.sellerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized"
      });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized"
    });
  }
};

/* =========================
   LOGOUT SELLER
   ========================= */
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.status(200).json({
      success: true,
      message: "Logged out"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};
