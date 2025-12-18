/**
 * Script to create an admin user
 * Run with: node scripts/createAdmin.js
 * 
 * Usage:
 * node scripts/createAdmin.js admin@example.com password123 Admin Name
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dehn-project';

async function createAdmin() {
  try {
    // Get credentials from command line arguments
    const email = process.argv[2];
    const password = process.argv[3];
    const name = process.argv[4] || 'Admin User';

    if (!email || !password) {
      console.error('Usage: node scripts/createAdmin.js <email> <password> [name]');
      console.error('Example: node scripts/createAdmin.js admin@example.com password123 "Admin Name"');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      // Update to admin if not already
      if (existingUser.role !== 'admin') {
        existingUser.role = 'admin';
        existingUser.password = password; // Will be hashed by pre-save hook
        await existingUser.save();
        console.log('✅ User updated to admin role');
      } else {
        console.log('⚠️  User already exists with admin role');
      }
    } else {
      // Create new admin user
      const admin = await User.create({
        email: email.toLowerCase(),
        password,
        name,
        role: 'admin'
      });
      console.log('✅ Admin user created successfully');
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();

