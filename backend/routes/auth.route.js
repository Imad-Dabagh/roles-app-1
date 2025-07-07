const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  refreshAccessToken,
} = require("../controllers/auth.controller.js");
const authenticate = require("../middleware/auth.js");
const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Called automatically by frontend interceptor
router.post("/refresh", refreshAccessToken);

// Protected route
router.get("/me", authenticate, getMe);

module.exports = router;
