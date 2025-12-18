// ============================================
// CORS PREFLIGHT FIX - COPY THIS TO YOUR BACKEND
// ============================================
// This fixes the "preflight request doesn't pass access control check" error
// Replace your existing CORS configuration with this code

import cors from 'cors';

// CORS Configuration - MUST allow your frontend origin
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Allow ALL Vercel domains (including preview deployments)
    // This is the KEY fix - allows all .vercel.app domains
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

// CRITICAL FIX: Explicitly handle OPTIONS requests (preflight)
// This is what fixes the "preflight request doesn't pass access control check" error
app.options('*', cors(corsOptions));

// ============================================
// END OF CORS CONFIGURATION
// ============================================

// Your other middleware (must be after CORS)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes
// app.use('/api/products', productRoutes);
// app.use('/api/auth', authRoutes);
// etc.

