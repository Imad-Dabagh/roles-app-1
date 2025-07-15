const bcrypt = require("bcrypt");
const User = require("../model/user.model.js");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.js");
require("dotenv").config();

// =========== Register User ===========
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const userRole = role || "customer";

    if (userRole && userRole !== "admin" && userRole !== "customer") {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =========== Login User ===========
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    // Set refresh token in cookie (HttpOnly, secure)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use true only in production
      // sameSite: "Strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return accessToken in body
    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =========== Get Me ===========
const getMe = async (req, res) => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      console.log("User ID not found in request");
      
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =========== Logout User ===========
const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/api/auth/refresh",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// =========== Refresh Token Handler ===========

const refreshAccessToken = async (req, res) => {
  // console.log('Cookies:', req.cookies); // Add this line
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }
    // Generate new access token
    const accessToken = generateAccessToken(decoded.userId, decoded.role);

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  refreshAccessToken,
};
