import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Serverless-compatible authentication middleware
 * Returns a promise that resolves if authenticated, rejects if not
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('No token provided. Authorization denied.');
      error.status = 401;
      return next(error);
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      const error = new Error('User not found. Token is invalid.');
      error.status = 401;
      return next(error);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      error.message = 'Invalid token. Authorization denied.';
      error.status = 401;
    } else if (error.name === 'TokenExpiredError') {
      error.message = 'Token expired. Please login again.';
      error.status = 401;
    } else {
      error.status = error.status || 500;
    }
    next(error);
  }
};

/**
 * Serverless-compatible admin authorization middleware
 */
export const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    const error = new Error('Authentication required');
    error.status = 401;
    return next(error);
  }

  if (req.user.role !== 'admin') {
    const error = new Error('Access denied. Admin privileges required.');
    error.status = 403;
    return next(error);
  }

  next();
};

