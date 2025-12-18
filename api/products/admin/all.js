import Product from '../../../backend/models/Product.js';
import User from '../../../backend/models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dehn-project';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    cachedDb = mongoose.connection;
    return cachedDb;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    if (req.method !== 'GET') {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }

    // Authenticate and authorize admin
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: 'No token provided. Authorization denied.'
        });
      }

      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found. Token is invalid.'
        });
      }

      if (user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          error: 'Access denied. Admin privileges required.'
        });
      }

      req.user = user;
    } catch (authError) {
      if (authError.name === 'JsonWebTokenError' || authError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: authError.message || 'Invalid or expired token'
        });
      }
      return res.status(401).json({
        success: false,
        error: 'Authentication failed'
      });
    }

    const products = await Product.find().sort({ createdAt: -1 });
    
    return res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Get all products error:', error);
    return res.status(500).json({
      success: false,
      error: 'Error fetching products',
      details: error.message
    });
  }
}

