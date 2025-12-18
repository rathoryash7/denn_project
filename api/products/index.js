import Product from '../../backend/models/Product.js';
import User from '../../backend/models/User.js';
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

async function authenticateAdmin(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: { status: 401, message: 'No token provided. Authorization denied.' } };
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return { error: { status: 401, message: 'User not found. Token is invalid.' } };
    }

    if (user.role !== 'admin') {
      return { error: { status: 403, message: 'Access denied. Admin privileges required.' } };
    }

    return { user };
  } catch (authError) {
    if (authError.name === 'JsonWebTokenError' || authError.name === 'TokenExpiredError') {
      return { error: { status: 401, message: authError.message || 'Invalid or expired token' } };
    }
    return { error: { status: 401, message: 'Authentication failed' } };
  }
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Add CORS headers to all responses
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  try {
    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost')) {
      return res.status(500).json({
        success: false,
        error: 'Database not configured. Please set MONGODB_URI environment variable.',
        details: 'MongoDB connection string is required for production deployment.'
      });
    }

    await connectToDatabase();

    if (req.method === 'GET') {
      const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
      
      return res.json({
        success: true,
        count: products.length,
        data: products
      });
    } else if (req.method === 'POST') {
      // Authenticate and authorize admin
      const authResult = await authenticateAdmin(req, res);
      if (authResult.error) {
        return res.status(authResult.error.status).json({
          success: false,
          error: authResult.error.message
        });
      }

      const productData = req.body;

      if (!productData.name || !productData.partNumber || !productData.price) {
        return res.status(400).json({
          success: false,
          error: 'Please provide name, partNumber, and price'
        });
      }

      const existingProduct = await Product.findOne({ partNumber: productData.partNumber });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          error: 'Product with this part number already exists'
        });
      }

      const product = await Product.create(productData);

      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('Products operation error:', error);
    
    // Handle MongoDB connection errors specifically
    if (error.name === 'MongoServerSelectionError' || error.name === 'MongooseServerSelectionError') {
      return res.status(500).json({
        success: false,
        error: 'Database connection failed',
        details: 'Unable to connect to MongoDB. Please check your MONGODB_URI environment variable.',
        message: error.message
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Error processing request',
      details: error.message,
      name: error.name
    });
  }
}
