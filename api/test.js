// Simple test endpoint to verify serverless functions are working
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    success: true,
    message: 'Serverless function is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    env: {
      hasMongoDB: !!process.env.MONGODB_URI,
      hasJWT: !!process.env.JWT_SECRET,
    }
  });
}

