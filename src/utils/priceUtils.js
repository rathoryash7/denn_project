/**
 * Price Utility Functions
 * Handles currency formatting and MOQ pricing calculations
 */

/**
 * Format price with AED currency and proper number formatting
 * @param {number} price - Price value
 * @returns {string} Formatted price string (e.g., "AED 1,250.00")
 */
export const formatPrice = (price) => {
  return `AED ${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Calculate unit price with MOQ discount
 * MOQ Rule: If quantity >= 100, apply 20% discount
 * @param {number} baseUnitPrice - Base unit price
 * @param {number} quantity - Order quantity
 * @returns {number} Unit price after MOQ discount (if applicable)
 */
export const calculateUnitPriceWithMOQ = (baseUnitPrice, quantity) => {
  if (quantity >= 100) {
    // Apply 20% discount for MOQ
    return baseUnitPrice * 0.8;
  }
  return baseUnitPrice;
};

/**
 * Calculate total price with MOQ discount
 * @param {number} baseUnitPrice - Base unit price
 * @param {number} quantity - Order quantity
 * @returns {number} Total price (unit price with MOQ × quantity)
 */
export const calculateTotalPrice = (baseUnitPrice, quantity) => {
  const unitPrice = calculateUnitPriceWithMOQ(baseUnitPrice, quantity);
  return unitPrice * quantity;
};

/**
 * Check if MOQ discount is applied
 * @param {number} quantity - Order quantity
 * @returns {boolean} True if quantity >= 100
 */
export const hasMOQDiscount = (quantity) => {
  return quantity >= 100;
};

