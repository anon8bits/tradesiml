import React, { createContext, useContext, useState, useEffect } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const storedIndex = localStorage.getItem('selectedIndex');
    return storedIndex !== null ? storedIndex : 'NIFTY 50';
  });

  const [selectedStock, setSelectedStock] = useState(() => {
    const storedStock = localStorage.getItem('selectedStock');
    return storedStock !== null ? JSON.parse(storedStock) : null;
  });

  useEffect(() => {
    localStorage.setItem('selectedIndex', selectedIndex);
    localStorage.setItem('selectedStock', JSON.stringify(selectedStock));
  }, [selectedIndex, selectedStock]);

  return (
    <StockContext.Provider value={{ selectedIndex, selectedStock, setSelectedIndex, setSelectedStock }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => useContext(StockContext);
