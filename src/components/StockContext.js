import React, { createContext, useContext, useState } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState('NIFTY 50');
  const [selectedStock, setSelectedStock] = useState('NIFTY 50');

  return (
    <StockContext.Provider value={{ selectedIndex, selectedStock, setSelectedIndex, setSelectedStock }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => useContext(StockContext);
