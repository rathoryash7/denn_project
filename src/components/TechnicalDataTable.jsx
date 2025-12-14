import React from 'react';

const TechnicalDataTable = () => {
  const technicalData = [
    { label: 'SPD class', value: 'TYPC1' },
    { label: 'Nominal voltage (UN)', value: '180 V' },
    { label: 'Max. continuous operating voltage (d.c.) (Uc)', value: '180 V' },
    { label: 'D1 Lightning impulse current (10/350 µs) per line (Iimp)', value: '1.5 kA' },
    { label: 'C2 Total nominal discharge current (8/20 µs) (In)', value: '10 kA' },
    { label: 'Series resistance per line', value: '0 ohm(s)' },
    { label: 'Approvals', value: 'UL 497B, CSA, ATEX, IECEx, CCC, SIL' },
  ];

  return (
    <div className="border border-gray-300 rounded bg-white p-4">
      <h2 className="text-sm font-semibold mb-3 text-gray-700">Technical data</h2>
      <table className="w-full text-sm">
        <tbody>
          {technicalData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-3 font-medium text-gray-700 w-2/5">{row.label}</td>
              <td className="py-2 px-3 text-gray-600">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-3 italic">
        *For details, see: www.dehn-international.com
      </p>
    </div>
  );
};

export default TechnicalDataTable;

