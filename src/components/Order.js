import React, { useState, useEffect } from 'react';
import styles from './Order.module.css'

const Order = ({ symbol, lastPrice }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (symbol && lastPrice) {
      setIsLoading(false);
    }
  }, [symbol, lastPrice]);

  const [entryPrice, setEntryPrice] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  console.log('Symbol = ', symbol);
  console.log('Last Price = ', lastPrice);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order execution logic here
    console.log('Order executed:', {
      symbol,
      entryPrice,
      orderQuantity,
      targetPrice,
      stopLoss
    });
  };

  return (
    <div>
      {isLoading ? (
        <button className="loader__btn">
          <div className="loader"></div>
          Loading ...
        </button>

      ) : (<>
        <h2>Place Order for {symbol}</h2>
        <form className={styles.form}>
          <p className="title">Order Details</p>
          <p className="message">Fill in the details to execute your order.</p>
          <div className="flex">
            <label>
              <input required placeholder="" type="number" className="input" />
              <span>Entry Price</span>
            </label>

            <label>
              <input required placeholder="" type="number" className="input" />
              <span>Order Quantity</span>
            </label>
          </div>

          <label>
            <input required placeholder="" type="number" className="input" />
            <span>Target Price</span>
          </label>

          <label>
            <input required placeholder="" type="number" className="input" />
            <span>Stop Loss</span>
          </label>
          <button className="submit">Execute Order</button>
        </form>
        <p className="signin">Already have an account? <a href="#">Sign in</a></p>
      </>)}


    </div>
  );
};

export default Order;
