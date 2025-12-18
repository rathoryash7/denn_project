import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotepad } from '../context/NotepadContext';
import { useAuth } from '../context/AuthContext';
import QuantitySelector from './QuantitySelector';
import LoginModal from './LoginModal';

/**
 * AddToNotepad Component
 * Handles adding product to notepad and navigation
 * Includes quantity selector left of the button
 * Requires authentication - shows login modal if not authenticated
 * @param {object} product - Product data to add
 * @param {number} quantity - Selected quantity
 * @param {function} onQuantityChange - Callback when quantity changes
 * @param {number} unitPrice - Unit price of the product
 * @param {string} currency - Currency code (default: AED)
 */
const AddToNotepad = ({ product, quantity, onQuantityChange, unitPrice, currency = 'AED' }) => {
  const navigate = useNavigate();
  const { addToNotepad } = useNotepad();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToNotepad = () => {
    // Check authentication first
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    // Add product to notepad context with price calculation
    // Total price = unit price × quantity (calculated in context)
    addToNotepad(product, quantity, unitPrice, currency);
    // Navigate to notepad page
    navigate('/notepad');
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <QuantitySelector 
          quantity={quantity} 
          onChange={onQuantityChange}
          disabled={!isAuthenticated}
        />
        <button
          onClick={handleAddToNotepad}
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isAuthenticated}
        >
          {isAuthenticated ? 'Add to Notepad' : 'Login to Add'}
        </button>
      </div>
      {!isAuthenticated && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Please log in to add products to Notepad
        </p>
      )}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        redirectPath={window.location.pathname}
      />
    </>
  );
};

export default AddToNotepad;

