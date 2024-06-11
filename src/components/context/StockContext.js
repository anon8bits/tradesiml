import React, { createContext, useState, useEffect } from 'react';

const StockContext = createContext({
  symbol: '',
  lastPrice: 0,
  setSymbol: () => { },
  setLastPrice: () => { },
});

const StockProvider = ({ children }) => {
  const [symbol, setSymbol] = useState(
    localStorage.getItem('selectedSymbol') || ''
  );
  const [lastPrice, setLastPrice] = useState(
    parseFloat(localStorage.getItem('selectedLastPrice')) || 0
  );

  const handleStockSelection = (selectedSymbol, selectedLastPrice) => {
    setSymbol(selectedSymbol);
    setLastPrice(selectedLastPrice);
    localStorage.setItem('selectedSymbol', selectedSymbol);
    localStorage.setItem('selectedLastPrice', selectedLastPrice.toString());
  };

  useEffect(() => {
    const handleTabClose = () => {
      setSymbol('');
      setLastPrice(0);
      localStorage.removeItem('selectedSymbol');
      localStorage.removeItem('selectedLastPrice');
    };

    window.addEventListener('beforeunload', handleTabClose);
    return () => window.removeEventListener('beforeunload', handleTabClose);
  }, []);

  return (
    <StockContext.Provider
      value={{ symbol, lastPrice, handleStockSelection }}
    >
      {children}
    </StockContext.Provider>
  );
};

export { StockContext, StockProvider };
