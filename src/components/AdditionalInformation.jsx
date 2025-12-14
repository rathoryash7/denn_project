import React from 'react';
import Accordion from './Accordion';

/**
 * AdditionalInformation Component
 * Displays additional product information in accordion format
 * No price information - price is shown in separate PriceContainer component
 */
const AdditionalInformation = () => {
  return (
    <div className="border border-gray-300 rounded bg-white p-4">
      <h2 className="text-sm font-semibold mb-3 text-gray-700">Additional information</h2>
      <div>
        <Accordion title="Specification sheets">
          <div className="space-y-2">
            <a href="#" className="text-blue-600 hover:underline block">Specification Sheet 1</a>
            <a href="#" className="text-blue-600 hover:underline block">Specification Sheet 2</a>
          </div>
        </Accordion>
        <Accordion title="CAD files">
          <div className="space-y-2">
            <a href="#" className="text-blue-600 hover:underline block">CAD File 1</a>
            <a href="#" className="text-blue-600 hover:underline block">CAD File 2</a>
          </div>
        </Accordion>
        <Accordion title="Tender specifications">
          <div className="space-y-2">
            <a href="#" className="text-blue-600 hover:underline block">Tender Specification 1</a>
          </div>
        </Accordion>
        <Accordion title="Instruction">
          <div className="space-y-2">
            <a href="#" className="text-blue-600 hover:underline block">Instruction Manual</a>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default AdditionalInformation;

