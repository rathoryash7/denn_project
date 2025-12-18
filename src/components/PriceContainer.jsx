import React from 'react';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/priceUtils';

/**
 * PriceContainer Component
 * Displays only unit price information in a separate container below Additional Information
 * Hides pricing for non-authenticated users
 * @param {object} articleData - Product/article data including price
 */
const PriceContainer = ({ articleData }) => {
  const { isAuthenticated } = useAuth();
  const unitPrice = articleData?.price || 0;
  const moq = articleData?.moq || 0;

  // Hide pricing information for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="border border-gray-300 rounded bg-gray-50 p-4 mt-6">
        <h2 className="text-sm font-semibold mb-3 text-gray-700">Pricing Information</h2>
        <div className="text-sm text-gray-500 italic">
          Please log in to view pricing information
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded bg-white p-4 mt-6">
      <h2 className="text-sm font-semibold mb-3 text-gray-700">Pricing Information</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Unit Price:</span>
          <span className="text-sm font-medium text-gray-900">
            {formatPrice(unitPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">MOQ Offer:</span>
          <span className="text-sm font-medium text-gray-900">
            20% discount on {moq} units
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceContainer;

