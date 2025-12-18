import express from 'express';
import Product from '../models/Product.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all active products
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching products',
      details: error.message
    });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID or part number
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by _id first, then by partNumber
    let product = await Product.findById(id);
    
    if (!product) {
      product = await Product.findOne({ partNumber: id });
    }
    
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching product',
      details: error.message
    });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create new product
 * @access  Private (Admin only)
 */
router.post('/', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const productData = req.body;

    // Validate required fields
    if (!productData.name || !productData.partNumber || !productData.price) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, partNumber, and price'
      });
    }

    // Check if part number already exists
    const existingProduct = await Product.findOne({ partNumber: productData.partNumber });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        error: 'Product with this part number already exists'
      });
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating product',
      details: error.message
    });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Private (Admin only)
 */
router.put('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow changing partNumber to an existing one
    if (updateData.partNumber) {
      const existingProduct = await Product.findOne({ 
        partNumber: updateData.partNumber,
        _id: { $ne: id }
      });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          error: 'Product with this part number already exists'
        });
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating product',
      details: error.message
    });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product (soft delete by setting isActive to false)
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting product',
      details: error.message
    });
  }
});

/**
 * @route   GET /api/products/admin/all
 * @desc    Get all products (including inactive) - Admin only
 * @access  Private (Admin only)
 */
router.get('/admin/all', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching products',
      details: error.message
    });
  }
});

export default router;

