import React, { useState } from 'react';

const ImageGallery = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 3;

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 1 ? totalImages : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === totalImages ? 1 : prev + 1));
  };

  return (
    <div className="border border-gray-300 rounded bg-white p-4">
      <h2 className="text-sm font-semibold mb-3 text-gray-700">Images</h2>
      <div className="relative">
        <div className="bg-gray-50 rounded flex items-center justify-center h-64 mb-3 border border-gray-200">
          <div className="bg-yellow-400 w-56 h-36 rounded-sm flex items-center justify-center text-gray-700 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-50"></div>
            <div className="relative z-10 text-center">
              <div className="w-32 h-20 bg-yellow-500 rounded-sm mx-auto mb-2 border-2 border-yellow-600"></div>
              <span className="text-xs font-medium text-gray-800">Product Image</span>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50"
          aria-label="Previous image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50"
          aria-label="Next image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Image Indicators */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalImages }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index + 1 === currentImage ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

