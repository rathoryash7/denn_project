import React, { useState } from 'react';
import { useNotepad } from '../context/NotepadContext';
import { useNavigate } from 'react-router-dom';
import QuantitySelector from '../components/QuantitySelector';
import { formatPrice } from '../utils/priceUtils';
import DehnLogo from '../components/DehnLogo';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * NotepadPage Component
 * Displays the notepad with all added products
 * Shows product image, name, unit price, quantity, and total price
 * Matches the screenshot layout with price column addition
 */
function NotepadPage() {
  const { notepadItems, removeFromNotepad, updateQuantity, clearNotepad } = useNotepad();
  const navigate = useNavigate();
  const [newProductNumber, setNewProductNumber] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);

  // Handle quantity update for a specific item
  const handleQuantityUpdate = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  // Handle remove item
  const handleRemove = (itemId) => {
    removeFromNotepad(itemId);
  };

  // Handle append new product (placeholder functionality)
  const handleAppend = () => {
    // This would typically fetch product data based on product number
    // For now, it's a placeholder
    if (newProductNumber && newQuantity > 0) {
      // In a real app, you'd fetch product details here
      console.log('Append product:', newProductNumber, 'Quantity:', newQuantity);
    }
  };

  // Generate PDF and send via email
  const generateAndSendPDF = async () => {
    if (notepadItems.length === 0) {
      return;
    }

    try {
      // Create a temporary container for PDF generation
      const printContent = document.createElement('div');
      printContent.style.position = 'absolute';
      printContent.style.left = '-9999px';
      printContent.style.width = '210mm';
      printContent.style.background = 'white';
      printContent.style.padding = '20mm';
      printContent.style.fontFamily = 'Arial, sans-serif';
      
      // Add print header
      const headerDiv = document.createElement('div');
      headerDiv.style.marginBottom = '20px';
      const logoDiv = document.createElement('div');
      logoDiv.textContent = 'DEHN';
      logoDiv.style.fontSize = '18px';
      logoDiv.style.fontWeight = 'bold';
      headerDiv.appendChild(logoDiv);
      printContent.appendChild(headerDiv);

      // Add Notepad title
      const titleDiv = document.createElement('h1');
      titleDiv.textContent = 'Notepad';
      titleDiv.style.fontSize = '18pt';
      titleDiv.style.fontWeight = 'bold';
      titleDiv.style.marginBottom = '12pt';
      printContent.appendChild(titleDiv);

      // Add divider
      const divider = document.createElement('div');
      divider.style.borderBottom = '1px solid #ccc';
      divider.style.marginBottom = '20px';
      printContent.appendChild(divider);

      // Add product items
      notepadItems.forEach((item, itemIndex) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.marginBottom = '30px';
        itemDiv.style.pageBreakInside = 'avoid';

        // Product heading
        const productHeading = document.createElement('h2');
        productHeading.textContent = `${item.product.partNumber} / ${item.product.name} / ${item.product.description}`;
        productHeading.style.fontSize = '14pt';
        productHeading.style.fontWeight = 'bold';
        productHeading.style.marginBottom = '15px';
        itemDiv.appendChild(productHeading);

        // 3-column layout container
        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = '120px 1fr 360px';
        gridContainer.style.gap = '24px';
        gridContainer.style.alignItems = 'start';

        // Column 1: Image
        const imageDiv = document.createElement('div');
        imageDiv.style.width = '120px';
        imageDiv.style.height = '120px';
        imageDiv.style.backgroundColor = '#fbbf24';
        gridContainer.appendChild(imageDiv);

        // Column 2: Title + Description
        const infoDiv = document.createElement('div');
        
        // Title
        const titleDiv = document.createElement('div');
        titleDiv.textContent = `#${itemIndex + 1} ${item.product.partNumber} / ${item.product.name} / ${item.product.description}`;
        titleDiv.style.fontSize = '12pt';
        titleDiv.style.fontWeight = '500';
        titleDiv.style.marginBottom = '8px';
        titleDiv.style.color = '#111827';
        infoDiv.appendChild(titleDiv);

        // Description
        const descDiv = document.createElement('div');
        descDiv.textContent = item.product.fullDescription || 'Space-saving, modular lightning current arrester with a width of 6 mm and push-in connection technology with status indication for protecting two single lines for lightning equipotential bonding as well as indirect earthing of shielded cables.';
        descDiv.style.fontSize = '12pt';
        descDiv.style.lineHeight = '1.6';
        descDiv.style.color = '#374151';
        infoDiv.appendChild(descDiv);

        gridContainer.appendChild(infoDiv);

        // Column 3: Prices
        const priceColumn = document.createElement('div');
        priceColumn.style.display = 'grid';
        priceColumn.style.gridTemplateColumns = '1fr 1fr 1fr';
        priceColumn.style.gap = '16px';
        priceColumn.style.textAlign = 'right';
        priceColumn.style.fontSize = '12pt';

        // Unit Price
        const unitPriceDiv = document.createElement('div');
        const unitPriceLabel = document.createElement('div');
        unitPriceLabel.textContent = 'Unit price';
        unitPriceLabel.style.fontSize = '10pt';
        unitPriceLabel.style.marginBottom = '4px';
        unitPriceLabel.style.color = '#6b7280';
        unitPriceDiv.appendChild(unitPriceLabel);
        const unitPriceValue = document.createElement('div');
        unitPriceValue.textContent = formatPrice(item.unitPriceWithMOQ || item.unitPrice);
        unitPriceValue.style.fontWeight = '500';
        unitPriceValue.style.color = '#111827';
        unitPriceDiv.appendChild(unitPriceValue);
        priceColumn.appendChild(unitPriceDiv);

        // Quantity
        const quantityDiv = document.createElement('div');
        quantityDiv.style.textAlign = 'center';
        const quantityLabel = document.createElement('div');
        quantityLabel.textContent = 'Quantity';
        quantityLabel.style.fontSize = '10pt';
        quantityLabel.style.marginBottom = '4px';
        quantityLabel.style.color = '#6b7280';
        quantityDiv.appendChild(quantityLabel);
        const quantityValue = document.createElement('div');
        quantityValue.textContent = item.quantity.toString();
        quantityValue.style.fontWeight = '500';
        quantityValue.style.color = '#111827';
        quantityDiv.appendChild(quantityValue);
        priceColumn.appendChild(quantityDiv);

        // Total Price
        const totalPriceDiv = document.createElement('div');
        const totalPriceLabel = document.createElement('div');
        totalPriceLabel.textContent = 'Total price';
        totalPriceLabel.style.fontSize = '10pt';
        totalPriceLabel.style.marginBottom = '4px';
        totalPriceLabel.style.color = '#6b7280';
        totalPriceDiv.appendChild(totalPriceLabel);
        const totalPriceValue = document.createElement('div');
        totalPriceValue.textContent = formatPrice(item.totalPrice);
        totalPriceValue.style.fontWeight = '600';
        totalPriceValue.style.color = '#111827';
        totalPriceDiv.appendChild(totalPriceValue);
        priceColumn.appendChild(totalPriceDiv);

        gridContainer.appendChild(priceColumn);
        itemDiv.appendChild(gridContainer);
        printContent.appendChild(itemDiv);
      });

      // Add footer
      const footerDiv = document.createElement('div');
      footerDiv.style.marginTop = '40px';
      footerDiv.style.paddingTop = '20px';
      footerDiv.style.borderTop = '1px solid #ccc';
      footerDiv.textContent = '© DEHN SE';
      footerDiv.style.fontSize = '10pt';
      printContent.appendChild(footerDiv);

      document.body.appendChild(printContent);

      // Generate PDF with full quality (backend supports any size)
      const canvas = await html2canvas(printContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const pdfBlob = pdf.output('blob');
      document.body.removeChild(printContent);

      // Send PDF via backend API (supports real file attachments, any size)
      try {
        const formData = new FormData();
        formData.append('pdf', pdfBlob, 'notepad.pdf');
        formData.append('recipientEmail', 'rathoryash1107@gmail.com');
        formData.append('subject', 'Notepad PDF');
        formData.append('message', 'Please find the notepad PDF attached.');

        const response = await fetch('http://localhost:3001/api/send-pdf-email', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to send email');
        }

        const result = await response.json();
        
        if (result.success) {
          console.log(`PDF sent successfully! Size: ${(pdfBlob.size / 1024).toFixed(2)}KB`);
          alert(`PDF sent successfully to rathoryash1107@gmail.com (${(pdfBlob.size / 1024).toFixed(2)}KB)`);
        } else {
          throw new Error(result.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Error sending PDF:', error);
        
        // Fallback: Download PDF if email fails
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'notepad.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        if (error.message && error.message.includes('Failed to fetch')) {
          alert('Backend server is not running. PDF downloaded instead. Please start the backend server: cd backend && npm start');
        } else {
          const errorDetails = error.details || error.message || error;
          const errorCode = error.code ? ` (Code: ${error.code})` : '';
          alert(`PDF downloaded. Email failed: ${errorDetails}${errorCode}\n\nPlease check:\n1. Backend server is running\n2. backend/.env file has correct EMAIL_USER and EMAIL_PASSWORD\n3. You're using Gmail App Password (not regular password)\n4. SMTP_HOST should be "smtp.gmail.com" (not your email address)`);
        }
      }

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Handle print notepad - opens browser print dialog and sends PDF via email
  const handlePrintNotepad = () => {
    // Generate and send PDF in the background
    generateAndSendPDF();
    // Open print dialog
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Hidden when printing */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DehnLogo size="md" />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="relative">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
            </div>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button className="text-gray-700">Menu</button>
          </div>
        </div>
      </header>

      {/* Print Header - Only visible when printing */}
      <div className="print-header print:block hidden">
        <DehnLogo className="justify-start" />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 print:max-w-full print:px-0 print:py-4">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 print:text-xl print:mb-3 print:mt-0 print:text-left print:font-bold">Notepad</h1>
        {/* Grey line below Notepad heading - only visible when printing */}
        <div className="print:block hidden border-b border-gray-300 mb-4 print:mb-6"></div>

        {/* Product List */}
        {notepadItems.length > 0 ? (
          <div className="space-y-4 mb-6">
            {notepadItems.map((item, index) => (
              <div
                key={item.id}
                className="border border-gray-300 rounded-lg p-4 bg-white print:border-0 print:rounded-none print:p-0 print:mb-8"
              >
                {/* Main Product Heading - Only in print, matches screenshot */}
                <div className="print:block hidden mb-4">
                  <h2 className="text-base font-bold text-black print:text-lg print:font-bold print:mb-4">
                    {item.product.partNumber} / {item.product.name} / {item.product.description}
                  </h2>
                </div>

                {/* Product Layout: Image left, Details right */}
                {/* Product Row – 3 column quotation layout */}
                {/* Product Layout: Image left, Details right (SCREEN) */}
                <div className="grid grid-cols-[96px_1fr_360px] gap-6 items-start print:hidden">
                  {/* COLUMN 1 – Image */}
                  <div className="w-24 h-24 bg-yellow-400 flex items-center justify-center print:w-32 print:h-32">
                    <span className="text-xs text-gray-700 print:hidden">Image</span>
                  </div>

                  {/* COLUMN 2 – Title + Description */}
                  <div>
                    {/* Row 1 – Title */}
                    <div className="text-sm font-medium text-gray-900 mb-2">
                      #{index + 1} {item.product.partNumber} / {item.product.name} / {item.product.description}
                    </div>
                    {/* Row 2 – Description */}
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {item.product.fullDescription ||
                        'Space-saving, modular lightning current arrester with a width of 6 mm and push-in connection technology with status indication for protecting two single lines for lightning equipotential bonding as well as indirect earthing of shielded cables.'}
                    </div>
                  </div>

                  {/* COLUMN 3 – Price / Qty / Total */}
                  <div>
                    {/* Row 1 – Prices */}
                    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 text-sm text-right">
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Unit price</div>
                        <div className="font-medium text-gray-900">
                          {formatPrice(item.unitPriceWithMOQ || item.unitPrice)}
                        </div>
                        {/* MOQ info */}
                        {item.quantity >= 100 && item.unitPriceWithMOQ && (
                          <div className="text-[10px] text-gray-500 mt-1 print:hidden">
                            MOQ discount applied
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Quantity</div>
                        {/* Screen */}
                        <div className="flex items-center justify-center gap-2 print:hidden">
                          {/* Minus */}
                          <button
                            onClick={() =>
                              handleQuantityUpdate(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="text-gray-600 hover:text-black px-1"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          {/* Input */}
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value, 10);
                              handleQuantityUpdate(item.id, isNaN(value) || value < 1 ? 1 : value);
                            }}
                            className="w-16 text-center border-b border-gray-300 focus:border-gray-600 focus:outline-none text-sm font-medium text-gray-900 bg-transparent"
                          />
                          {/* Plus */}
                          <button
                            onClick={() =>
                              handleQuantityUpdate(item.id, item.quantity + 1)
                            }
                            className="text-gray-600 hover:text-black px-1"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        {/* Print */}
                        <div className="hidden print:block font-medium text-gray-900">
                          {item.quantity}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Total price</div>
                        <div className="font-semibold text-gray-900">
                          {formatPrice(item.totalPrice)}
                        </div>
                      </div>
                    </div>
                    {/* Row 2 – Remove */}
                    <div className="mt-2 print:hidden text-right">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-xs text-gray-500 hover:text-red-600 underline"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* PRINT LAYOUT – restructured for PDF */}
                <div className="hidden print:block mt-6">
                  {/* Row 1: Image + Title + Description */}
                  <div className="grid grid-cols-[120px_1fr] gap-6 items-start mb-4">
                    {/* Image */}
                    <div className="w-28 h-28 border border-gray-300"></div>
                    {/* Title + Description */}
                    <div>
                      <div className="font-bold text-base mb-2">
                        #{index + 1} {item.product.partNumber} / {item.product.name} / {item.product.description}
                      </div>
                      <div className="text-sm leading-relaxed">
                        {item.product.fullDescription ||
                          'Space-saving, modular lightning current arrester with a width of 6 mm and push-in connection technology with status indication for protecting two single lines for lightning equipotential bonding as well as indirect earthing of shielded cables.'}
                      </div>
                    </div>
                  </div>
                  {/* Row 2: Prices */}
                  <div className="grid grid-cols-3 gap-6 text-sm">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Unit price</div>
                      <div className="font-medium">
                        {formatPrice(item.unitPriceWithMOQ || item.unitPrice)}
                      </div>
                      {/* MOQ info – PRINT */}
                      {item.quantity >= 100 && item.unitPriceWithMOQ && (
                        <div className="text-[11px] text-gray-600 mt-1">
                          MOQ discount applied
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Quantity</div>
                      <div className="font-medium">{item.quantity}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Total price</div>
                      <div className="font-medium">
                        {formatPrice(item.totalPrice)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Your notepad is empty.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-blue-600 hover:underline"
            >
              Browse products
            </button>
          </div>
        )}

        {/* Add Product Section - Hidden when printing */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 mb-4 print:hidden">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product number
              </label>
              <input
                type="text"
                value={newProductNumber}
                onChange={(e) => setNewProductNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="Enter product number"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAppend}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                append
              </button>
            </div>
          </div>
        </div>

        {/* Clear List Button - Hidden when printing */}
        {notepadItems.length > 0 && (
          <div className="mb-6 print:hidden">
            <button
              onClick={clearNotepad}
              className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear list
            </button>
          </div>
        )}

        {/* Notepad Footer Actions - Hidden when printing */}
        <div className="border-t border-gray-200 pt-6 mt-6 print:hidden">
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={handlePrintNotepad}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors print:hidden"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print notepad
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Share as PDF
            </button>
            <select className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400">
              <option>Downloads</option>
            </select>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Please log in to have access to all downloads
          </p>
        </div>
      </main>

      {/* Print Footer - Only visible when printing */}
      <div className="print-footer print:block hidden">
        <div className="text-left">© DEHN SE</div>
      </div>
    </div>
  );
}

export default NotepadPage;
