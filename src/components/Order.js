import React, { useState, useEffect, useContext } from 'react';
import styles from './css/Order.module.css';
import { StockContext } from './context/StockContext.js';

const Order = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { symbol, lastPrice } = useContext(StockContext);
  useEffect(() => {
    if (symbol && lastPrice) {
      setIsLoading(false);
    }
  }, [symbol, lastPrice]);

  const [entryPrice, setEntryPrice] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
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
    <div /* className={styles.container} */>
      {isLoading ? (
        <div className={styles.container}>
          <button className={styles.loader__btn}>
            <div className={styles.loader}></div>
            Loading ...
          </button>
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <h3 style={{ color: 'black' }}>Place Order for <b>{symbol}</b></h3>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <p className={styles.title}>Order Details</p>
              <p className={styles.message} style={{ marginBottom: '5px' }}>Order type</p>
              <div className={styles.switchContainer}>
                <span className={styles.switchText}>Buy</span>
                <label className={styles.switch}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
                <span className={styles.switchText}>    Sell</span>
              </div>
              <div className={styles.flex}>
                <label>
                  <input required placeholder="" type="number" className={styles.input} />
                  <span>Entry Price</span>
                </label>

                <label>
                  <input required placeholder="" type="number" className={styles.input} />
                  <span>Order Quantity</span>
                </label>
              </div>
              <div className={styles.flex}>
                <label>
                  <input required placeholder="" type="number" className={styles.input} />
                  <span>Target Price</span>
                </label>

                <label>
                  <input required placeholder="" type="number" className={styles.input} />
                  <span>Stop Loss</span>
                </label>
              </div>
              <label>
                <input required placeholder="" type="number" className={styles.input} />
                <span>Time Frame</span>
              </label>
              <button className={styles.submit} onClick={handleSubmit}>Execute Order</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
