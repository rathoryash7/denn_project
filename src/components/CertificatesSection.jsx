import React from 'react';

const CertificatesSection = () => {
  const certificates = [
    { name: 'ATEX', bg: 'bg-blue-100' },
    { name: 'CCC', bg: 'bg-red-100' },
    { name: 'CE', bg: 'bg-blue-200' },
    { name: 'CSA', bg: 'bg-green-100' },
    { name: 'IECEx', bg: 'bg-yellow-100' },
    { name: 'DEHN', bg: 'bg-gray-200' },
    { name: 'UK CA', bg: 'bg-purple-100' },
    { name: 'UL', bg: 'bg-orange-100' },
  ];

  return (
    <div className="border border-gray-300 rounded bg-white p-4">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">Certificates</h3>
      <div className="grid grid-cols-4 gap-3">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className={`${cert.bg} rounded border border-gray-300 flex items-center justify-center h-16 text-xs font-medium text-gray-700`}
          >
            {cert.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatesSection;

