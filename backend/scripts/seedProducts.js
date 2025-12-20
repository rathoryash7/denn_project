/**
 * Seed script to add initial product to MongoDB
 * Run with: node --experimental-modules scripts/seedProducts.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dehn-project';

const seedProduct = {
  name: 'BCO ML2 B 180',
  fullName: 'BCO ML2 B 180',
  partNumber: '927210',
  description: 'Arrester for 2 single cores BLITZDUCTORconnect w. fault indication',
  fullDescription: 'Space-saving, modular lightning current arrester with a width of 6 mm and push-in connection technology with status indication for protecting two single lines for lightning equipotential bonding as well as indirect earthing of shielded cables. With signal disconnection for maintenance purposes.',
  price: 125.50,
  currency: 'AED',
  moq: 100,
  moqDiscountPercent: 20,
  gtin: '4013364405585',
  customsTariff: '85363010',
  grossWeight: '57.75 g',
  pu: '1.00 pc(s)',
  technicalData: [
    { key: 'Type', value: 'Lightning current arrester' },
    { key: 'Voltage', value: '230 / 400 V' },
    { key: 'Frequency', value: '50 / 60 Hz' }
  ],
  images: [],
  isActive: true
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if product already exists
    const existingProduct = await Product.findOne({ partNumber: seedProduct.partNumber });
    
    if (existingProduct) {
      console.log('Product already exists, updating...');
      await Product.findOneAndUpdate(
        { partNumber: seedProduct.partNumber },
        seedProduct,
        { new: true }
      );
      console.log('✅ Product updated successfully');
    } else {
      await Product.create(seedProduct);
      console.log('✅ Product seeded successfully');
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding product:', error);
    process.exit(1);
  }
}

seed();


