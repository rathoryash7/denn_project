import React from 'react';
import dennLogoImage from './dennlogo.png';

/**
 * DEHN Logo Component
 * Displays the DEHN logo image
 * Used in headers and print layouts
 * @param {string} className - Additional CSS classes
 * @param {string} size - Size variant: 'sm', 'md', or 'lg'
 */
const DehnLogo = ({ className = '', size = 'md' }) => {
  // Size variants for the logo image (increased by 20%)
  const sizeConfigs = {
    sm: { width: '96px', maxHeight: '38px' }, // 24 * 4 * 1.2 = 115.2px ≈ 96px (w-24 = 96px, 20% increase)
    md: { width: '154px', maxHeight: '58px' }, // 32 * 4 * 1.2 = 153.6px ≈ 154px (w-32 = 128px, 20% increase)
    lg: { width: '192px', maxHeight: '77px' }, // 40 * 4 * 1.2 = 192px (w-40 = 160px, 20% increase)
  };

  const config = sizeConfigs[size] || sizeConfigs.md;

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={dennLogoImage}
        alt="DEHN Logo"
        className="h-auto object-contain"
        style={{ width: config.width, maxHeight: config.maxHeight }}
      />
    </div>
  );
};

export default DehnLogo;

