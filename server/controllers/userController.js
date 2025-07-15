import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 🧾 Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // 🧂 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🖼️ Validate uploaded image (optional but helps)
        let profilePic = null;
        if (req.file) {
            const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({
                    success: false,
                    message: "Unsupported file type. Please upload JPG, PNG, or WEBP images only.",
                });
            }
            profilePic = req.file.path;
        }

        // 📦 Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profilePic: profilePic,
        });

        // 🔐 Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 🍪 Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            user: {
                email: user.email,
                name: user.name,
                profilePic: user.profilePic || null,
            },
        });
    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ success: false, message: "Server error. Try again later." });
    }
};

// 🔐 Login User : /api/user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ success: false, message: 'Email and password are required' });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ success: false, message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ success: false, message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            success: true,
            user: {
                email: user.email,
                name: user.name,
                profilePic: user.profilePic || null,
            },
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ success: false, message: "Server error. Try again later." });
    }
};

// 👤 Check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.error("Auth Check Error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// 🚪 Logout User : /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        console.error("Logout Error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};