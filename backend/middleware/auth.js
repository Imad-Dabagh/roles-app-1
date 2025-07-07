const { verifyAccessToken } = require('../utils/jwt');

// ===================== Middleware: Authenticate JWT
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // 2. Extract the accessToken
  const accessToken = authHeader.split(' ')[1];

  // 3. Verify the token
  try {
    const decoded = verifyAccessToken(accessToken); // should return { id, role }
    req.user = decoded; // Attach user info to request object to access in routes 
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
