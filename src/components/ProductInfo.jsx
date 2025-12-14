import React from 'react';

const ProductInfo = ({ articleData }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold mb-3 text-gray-900">BCO ML2 B 180</h1>
      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
        Space-saving, modular lightning current arrester with a width of 6 mm and push-in connection technology with status indication for protecting two single lines for lightning equipotential bonding as well as indirect earthing of shielded cables. With signal disconnection for maintenance purposes.
      </p>
      <p className="text-sm text-gray-600 mb-4">1 Product</p>
      
      <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
        <div className="flex">
          <span className="font-medium text-gray-700 w-48">Part No.:</span>
          <span className="text-gray-600">{articleData?.partNumber || '927210 BCO ML2 B 180'}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-48">GTIN:</span>
          <span className="text-gray-600">{articleData?.gtin || '4013364405585'}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-48">Customs tariff No. (EU):</span>
          <span className="text-gray-600">{articleData?.customsTariff || '85363010'}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-48">Gross weight:</span>
          <span className="text-gray-600">{articleData?.grossWeight || '57.75 g'}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-48">PU:</span>
          <span className="text-gray-600">{articleData?.pu || '1.00 pc(s)'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

