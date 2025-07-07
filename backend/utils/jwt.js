const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate access token (short-lived)
const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10m' } 
  );
};

// Generate refresh token (long-lived)
const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // Longer expiration
  );
};

// Verify access token
const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};