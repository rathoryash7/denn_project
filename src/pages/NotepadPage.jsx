import React, { useState } from 'react';
import { useNotepad } from '../context/NotepadContext';
import { useNavigate } from 'react-router-dom';
import QuantitySelector from '../components/QuantitySelector';
import { formatPrice } from '../utils/priceUtils';
import DehnLogo from '../components/DehnLogo';

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

  // Handle print notepad - opens browser print dialog for PDF printing
  const handlePrintNotepad = () => {
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
                <div className="flex items-start gap-4 print:flex-row">
                  {/* Product Image - Left side */}
                  <div className="w-20 h-20 bg-yellow-400 rounded flex-shrink-0 flex items-center justify-center print:w-32 print:h-32 print:rounded-sm print:mr-6">
                    <span className="text-xs text-gray-700 print:hidden">Image</span>
                  </div>

                  {/* Product Details - Right side */}
                  <div className="flex-1 min-w-0 print:flex-1">
                    {/* Product Numbered Title - Indented, matches screenshot */}
                    <div className="mb-2 print:mb-3 print:font-bold print:text-base print:pl-0">
                      <span className="text-sm text-gray-500 print:text-black print:font-bold">
                        #{index + 1} {item.product.partNumber} / {item.product.name} / {item.product.description}
                      </span>
                    </div>
                    {/* Product Description - Regular text below title */}
                    <div className="text-sm text-gray-700 print:text-black print:leading-relaxed print:pl-0 print:text-sm print:font-normal print:mb-4">
                      {item.product.fullDescription || item.product.description || 'Space-saving, modular lightning current arrester with a width of 6 mm and push-in connection technology with status indication for protecting two single lines for lightning equipotential bonding as well as indirect earthing of shielded cables. With signal disconnection for maintenance purposes.'}
                    </div>

                    {/* Price, Quantity, Total Price - Vertical stack: Unit Price and Total Price above Quantity */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0 print:flex-row print:items-start print:gap-4 print:mt-4">
                      {/* Top Row: Unit Price and Total Price */}
                      <div className="flex flex-col gap-2 items-end print:flex-row print:gap-4">
                        {/* Unit Price Box - Keep same size */}
                        <div className="border border-gray-300 rounded px-3 py-2 bg-white min-w-[140px] text-right print:border-gray-400 print:min-w-[140px] print:px-3 print:py-2">
                          <div className="text-xs text-gray-600 mb-1 print:text-gray-700 print:font-medium">Unit Price</div>
                          <div className="text-sm font-semibold text-gray-900 print:text-sm print:font-bold">
                            {formatPrice(item.unitPriceWithMOQ || item.unitPrice)}
                          </div>
                          {item.quantity >= 100 && (
                            <div className="text-xs text-green-600 mt-1 print:hidden">MOQ Discount Applied</div>
                          )}
                        </div>

                        {/* Total Price Box - Keep same size */}
                        <div className="border border-gray-300 rounded px-3 py-2 bg-white min-w-[140px] text-right print:border-gray-400 print:min-w-[140px] print:px-3 print:py-2">
                          <div className="text-xs text-gray-600 mb-1 print:text-gray-700 print:font-medium">Total Price</div>
                          <div className="text-sm font-semibold text-gray-900 print:text-sm print:font-bold">
                            {formatPrice(item.totalPrice)}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Quantity (button style) and Remove */}
                      <div className="flex items-center gap-2 print:flex-row print:gap-4">
                        {/* Quantity Box - Styled as button, same size as price boxes */}
                        <div className="border border-gray-300 rounded px-3 py-2 bg-white min-w-[140px] text-right print:border-gray-400 print:min-w-[140px] print:px-3 print:py-2 print:block hidden">
                          <div className="text-xs text-gray-600 mb-1 print:text-gray-700 print:font-medium">Quantity</div>
                          <div className="text-sm font-semibold text-gray-900 print:text-sm print:font-bold">{item.quantity}</div>
                        </div>
                        {/* Quantity Input - Styled as button matching price boxes */}
                        <div className="border border-gray-300 rounded px-3 py-2 bg-white min-w-[140px] text-right print:hidden">
                          <div className="text-xs text-gray-600 mb-1">Quantity</div>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              handleQuantityUpdate(item.id, Math.max(1, value));
                            }}
                            min="1"
                            className="w-full px-2 py-1 border-0 text-center text-sm font-semibold text-gray-900 bg-transparent focus:outline-none focus:ring-0"
                            style={{ appearance: 'textfield' }}
                          />
                        </div>

                        {/* Remove Button - Next to quantity */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-sm text-red-600 hover:text-red-700 underline whitespace-nowrap print:hidden"
                        >
                          remove
                        </button>
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

