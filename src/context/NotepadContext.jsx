import React, { createContext, useContext, useState } from 'react';
import { calculateTotalPrice, calculateUnitPriceWithMOQ } from '../utils/priceUtils';

const NotepadContext = createContext();

export const useNotepad = () => {
  const context = useContext(NotepadContext);
  if (!context) {
    throw new Error('useNotepad must be used within NotepadProvider');
  }
  return context;
};

export const NotepadProvider = ({ children }) => {
  // Store notepad items: array of products with quantity and price
  const [notepadItems, setNotepadItems] = useState([]);

  // Add product to notepad
  // Price calculation with MOQ: totalPrice = (unitPrice with MOQ discount) × quantity
  const addToNotepad = (product, quantity, unitPrice, currency = 'AED') => {
    const unitPriceWithMOQ = calculateUnitPriceWithMOQ(unitPrice, quantity);
    const totalPrice = calculateTotalPrice(unitPrice, quantity);
    const newItem = {
      id: Date.now(), // Simple ID generation
      product,
      quantity,
      unitPrice, // Base unit price (before MOQ discount)
      unitPriceWithMOQ, // Unit price after MOQ discount
      totalPrice,
      currency,
    };
    setNotepadItems((prev) => [...prev, newItem]);
  };

  // Remove product from notepad
  const removeFromNotepad = (id) => {
    setNotepadItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity of a notepad item
  // Recalculates unit price with MOQ and total price
  const updateQuantity = (id, newQuantity) => {
    setNotepadItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const unitPriceWithMOQ = calculateUnitPriceWithMOQ(item.unitPrice, newQuantity);
          const totalPrice = calculateTotalPrice(item.unitPrice, newQuantity);
          return {
            ...item,
            quantity: newQuantity,
            unitPriceWithMOQ,
            totalPrice,
          };
        }
        return item;
      })
    );
  };

  // Clear all notepad items
  const clearNotepad = () => {
    setNotepadItems([]);
  };

  const value = {
    notepadItems,
    addToNotepad,
    removeFromNotepad,
    updateQuantity,
    clearNotepad,
  };

  return (
    <NotepadContext.Provider value={value}>{children}</NotepadContext.Provider>
  );
};

