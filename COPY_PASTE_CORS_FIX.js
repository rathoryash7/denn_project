// ============================================
// COPY THIS ENTIRE CORS CONFIGURATION
// Paste it in your external backend server.js/index.js
// Replace your existing CORS configuration with this
// ============================================

import cors from 'cors';

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Allow ALL Vercel domains (including preview deployments)
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    // Allow localhost for local development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow all origins (for development/testing)
    // You can restrict this in production if needed
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS middleware (MUST be before routes)
app.use(cors(corsOptions));

// CRITICAL: Handle preflight OPTIONS requests explicitly
// This line is ESSENTIAL - it handles the preflight requests that were failing
app.options('*', cors(corsOptions));

// Then add your other middleware (express.json, etc.)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// END OF CORS CONFIGURATION
// ============================================

