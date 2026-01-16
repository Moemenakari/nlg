const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(`🔐 Admin check - User: ${req.user.username}, Role: ${req.user.role}`);
    if (req.user.role !== 'admin') {
      console.log(`❌ Admin access denied for user: ${req.user.username} (role: ${req.user.role})`);
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
};

module.exports = { verifyToken, verifyAdmin };
