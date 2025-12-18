import nodemailer from 'nodemailer';
import multer from 'multer';

// Configure multer to use memory storage (required for serverless)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle file upload using multer
    await new Promise((resolve, reject) => {
      upload.single('pdf')(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const { recipientEmail, subject, message } = req.body;
    const pdfFile = req.file;

    if (!pdfFile) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const emailTo = recipientEmail || process.env.DEFAULT_RECIPIENT_EMAIL || 'rathoryash1107@gmail.com';

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPass || emailUser === 'your-email@gmail.com' || emailPass === 'your-app-password') {
      return res.status(500).json({
        error: 'Email service not configured. Please set EMAIL_USER and EMAIL_PASSWORD in environment variables',
      });
    }

    // Check if message is HTML
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
          content: pdfFile.buffer, // Use buffer instead of path for serverless
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your EMAIL_USER and EMAIL_PASSWORD. Make sure you\'re using App Password, not regular password.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Connection failed. Please check SMTP_HOST and SMTP_PORT.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return res.status(500).json({
      error: errorMessage,
      details: error.message,
      code: error.code,
    });
  }
}

