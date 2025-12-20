import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dehn-project';

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
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await connectToDatabase();
    const dbStatus = db && db.readyState === 1 ? 'connected' : 'disconnected';
    
    return res.json({ 
      status: 'OK',
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.json({
      status: 'OK',
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
}


