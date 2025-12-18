import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dehn-project';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️  Continuing without database connection (email functionality will still work)');
  });

// Middleware - CORS with explicit configuration
// Allow all Vercel preview deployments and local development
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Allow all Vercel domains (preview deployments)
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow specific origins
    const allowedOrigins = [
      'https://denn-project-j81qhqrg1-rathoryash7s-projects.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // For any other origin, allow it (for development/testing)
    // In production, you might want to reject unknown origins
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

// Endpoint to send PDF via email
app.post('/api/send-pdf-email', upload.single('pdf'), async (req, res) => {
  try {
    const { recipientEmail, subject, message } = req.body;
    const pdfFile = req.file;

    console.log('Received request to send PDF email');
    console.log('Recipient email:', recipientEmail);
    console.log('PDF file:', pdfFile ? 'Received' : 'Missing');

    if (!pdfFile) {
      console.error('PDF file is missing');
      return res.status(400).json({ error: 'PDF file is required' });
    }

    // Use the provided email or default to rathoryash1107@gmail.com
    const emailTo = recipientEmail || 'rathoryash1107@gmail.com';

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPass || emailUser === 'your-email@gmail.com' || emailPass === 'your-app-password') {
      console.error('Email credentials not configured properly');
      return res.status(500).json({
        error: 'Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD in .env file',
      });
    }

    // Email configuration
    // Check if message is HTML (contains HTML tags) or plain text
    const isHtml = message && (message.includes('<html') || message.includes('<!DOCTYPE') || message.includes('<div'));
    
    const mailOptions = {
      from: emailUser,
      to: emailTo,
      subject: subject || 'Notepad PDF',
      text: isHtml ? 'Please find the notepad PDF attached. View this email in HTML format for the full content.' : (message || 'Please find the notepad PDF attached.'),
      html: isHtml ? message : `<p>${message || 'Please find the notepad PDF attached.'}</p>`,
      attachments: [
        {
          filename: pdfFile.originalname || 'notepad.pdf',
          path: pdfFile.path,
        },
      ],
    };

    console.log('Attempting to send email to:', emailTo);

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    // Delete the uploaded file after sending
    fs.unlinkSync(pdfFile.path);

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Full error:', JSON.stringify(error, null, 2));
    
    // Provide more detailed error message
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your EMAIL_USER and EMAIL_PASSWORD in .env file. Make sure you\'re using App Password, not regular password.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Connection failed. Please check SMTP_HOST and SMTP_PORT in .env file.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    res.status(500).json({
      error: errorMessage,
      details: error.message,
      code: error.code,
    });
  }
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Root endpoint - API information
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API is running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      sendPdfEmail: '/api/send-pdf-email'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'OK',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Vercel serverless function handler
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}
