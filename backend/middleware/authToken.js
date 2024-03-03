// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers.authorization);

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authorizationHeader.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    
    // Check if the required role is present in the decoded token
    if (!decoded.role || !['owner', 'admin', 'deliveryagent', 'customer'].includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(403).json({ message: 'Forbidden' });
  }
};




export const adminAuthenticateToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authorizationHeader.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token not found in Authorization header' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    console.log('Decoded token:', decoded);

    if (!decoded.role || !['owner', 'admin'].includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(403).json({ message: 'Forbidden: Token verification failed' });
  }
};
