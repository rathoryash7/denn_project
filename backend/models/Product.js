import mongoose from 'mongoose';

const technicalDataSchema = new mongoose.Schema({
  key: String,
  value: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  fullName: {
    type: String,
    trim: true
  },
  partNumber: {
    type: String,
    required: [true, 'Part number is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  fullDescription: {
    type: String,
    trim: true
  },
  
  // Pricing
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  currency: {
    type: String,
    default: 'AED'
  },
  moq: {
    type: Number,
    default: 100,
    min: [0, 'MOQ must be positive']
  },
  moqDiscountPercent: {
    type: Number,
    default: 20,
    min: [0, 'Discount must be positive'],
    max: [100, 'Discount cannot exceed 100%']
  },
  
  // Product Details
  gtin: {
    type: String,
    trim: true
  },
  customsTariff: {
    type: String,
    trim: true
  },
  grossWeight: {
    type: String,
    trim: true
  },
  pu: {
    type: String,
    default: '1.00 pc(s)'
  },
  
  // Technical Data
  technicalData: [technicalDataSchema],
  
  // Images
  images: [{
    type: String,
    trim: true
  }],
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries (partNumber already has unique index from schema definition above)
productSchema.index({ isActive: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;

