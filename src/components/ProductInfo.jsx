import React from 'react';

const ProductInfo = ({ articleData }) => {
  if (!articleData) return null;

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold mb-3 text-gray-900">
        {articleData.fullName || articleData.name || 'Product'}
      </h1>
      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
        {articleData.fullDescription || articleData.description || ''}
      </p>
      <p className="text-sm text-gray-600 mb-4">1 Product</p>
      
      <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
        <div className="flex">
          <span className="font-medium text-gray-700 w-48">Part No.:</span>
          <span className="text-gray-600">{articleData.partNumber || 'N/A'}</span>
        </div>
        {articleData.gtin && (
          <div className="flex">
            <span className="font-medium text-gray-700 w-48">GTIN:</span>
            <span className="text-gray-600">{articleData.gtin}</span>
          </div>
        )}
        {articleData.customsTariff && (
          <div className="flex">
            <span className="font-medium text-gray-700 w-48">Customs tariff No. (EU):</span>
            <span className="text-gray-600">{articleData.customsTariff}</span>
          </div>
        )}
        {articleData.grossWeight && (
          <div className="flex">
            <span className="font-medium text-gray-700 w-48">Gross weight:</span>
            <span className="text-gray-600">{articleData.grossWeight}</span>
          </div>
        )}
        {articleData.pu && (
          <div className="flex">
            <span className="font-medium text-gray-700 w-48">PU:</span>
            <span className="text-gray-600">{articleData.pu}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;

