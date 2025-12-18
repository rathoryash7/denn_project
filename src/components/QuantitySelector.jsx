import React from 'react';

/**
 * QuantitySelector Component
 * Displays a quantity input field that can be controlled via props
 * Size adjusts automatically based on the value to ensure all digits are visible
 * @param {number} quantity - Current quantity value
 * @param {function} onChange - Callback function when quantity changes
 * @param {boolean} disabled - Whether the input is disabled (for non-authenticated users)
 */
const QuantitySelector = ({ quantity, onChange, disabled = false }) => {
  const handleChange = (e) => {
    if (disabled) return;
    const value = parseInt(e.target.value) || 1;
    const validValue = Math.max(1, value);
    if (onChange) {
      onChange(validValue);
    }
  };

  // Calculate width based on number of digits
  const getWidth = () => {
    const digits = String(quantity || 1).length;
    // Minimum width for 1-2 digits, then add extra width for each additional digit
    const minWidth = 48; // w-12 equivalent (3rem = 48px)
    const charWidth = 12; // Approximate width per digit
    const padding = 16; // px-2 on both sides
    return Math.max(minWidth, digits * charWidth + padding);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min="1"
        disabled={disabled}
        className="px-2 py-1.5 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
        style={{ width: `${getWidth()}px`, minWidth: '48px' }}
      />
    </div>
  );
};

export default QuantitySelector;

