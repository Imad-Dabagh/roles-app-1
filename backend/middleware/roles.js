// Middleware to check if user has required role
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    next();
  };
};

module.exports = checkRole;