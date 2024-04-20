import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [symbol, setSymbol] = useState(() => {
    const storedSymbol = localStorage.getItem('orderSymbol');
    return storedSymbol !== null ? storedSymbol : '';
  });

  const [price, setPrice] = useState(() => {
    const storedPrice = localStorage.getItem('orderPrice');
    return storedPrice !== null ? parseFloat(storedPrice) : -1;
  });

  useEffect(() => {
    localStorage.setItem('orderSymbol', symbol);
    localStorage.setItem('orderPrice', price.toString());
  }, [symbol, price]);

  return (
    <OrderContext.Provider value={{ symbol, price, setSymbol, setPrice }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
