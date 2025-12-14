import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotepad } from '../context/NotepadContext';
import QuantitySelector from './QuantitySelector';

/**
 * AddToNotepad Component
 * Handles adding product to notepad and navigation
 * Includes quantity selector left of the button
 * @param {object} product - Product data to add
 * @param {number} quantity - Selected quantity
 * @param {function} onQuantityChange - Callback when quantity changes
 * @param {number} unitPrice - Unit price of the product
 * @param {string} currency - Currency code (default: AED)
 */
const AddToNotepad = ({ product, quantity, onQuantityChange, unitPrice, currency = 'AED' }) => {
  const navigate = useNavigate();
  const { addToNotepad } = useNotepad();

  const handleAddToNotepad = () => {
    // Add product to notepad context with price calculation
    // Total price = unit price × quantity (calculated in context)
    addToNotepad(product, quantity, unitPrice, currency);
    // Navigate to notepad page
    navigate('/notepad');
  };

  return (
    <div className="flex items-center gap-3">
      <QuantitySelector quantity={quantity} onChange={onQuantityChange} />
      <button
        onClick={handleAddToNotepad}
        className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm font-medium"
      >
        Add to Notepad
      </button>
    </div>
  );
};

export default AddToNotepad;

