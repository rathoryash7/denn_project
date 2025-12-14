import React from 'react';

const AccessoryButton = () => {
  return (
    <button className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2">
      <span>&gt;</span>
      <span>Accessory</span>
    </button>
  );
};

export default AccessoryButton;

