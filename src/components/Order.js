// Order.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './css/Order.module.css';
import { StockContext } from './context/StockContext.js';
import CustomAlert from './CustomAlert.js';
import Tooltip from './InfoToolTip.js';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading.js';
import Notification from './Notification.js';
import ConfirmModal from './ConfirmModal.js'

const Order = () => {
  const { symbol, lastPrice } = useContext(StockContext);
  const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0();
  const [alertInfo, setAlertInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({ redirectUri: `${process.env.REACT_APP_FRONTEND}/market/order` });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  const [entryPrice, setEntryPrice] = useState(lastPrice);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLoss, setStopLoss] = useState(0);
  const [orderType, setOrderType] = useState(1); // 1 for buy, 2 for sell
  const [timeFrame, setTimeFrame] = useState('');

  const handleOrderTypeChange = () => {
    setOrderType((prevType) => (prevType === 1 ? 2 : 1));
  };

  const tooltipMessages = {
    entryPrice: "The price at which you want to enter the trade. By default, it's current market price.",
    orderQuantity: "The number of shares you want to trade. Must be a positive integer.",
    targetPrice: "The price at which you want to take profit. Must be higher than entry price for buy orders, lower for sell orders.",
    stopLoss: "The price at which you want to order gets automatically triggered. Must be lower than entry price for buy orders, higher for sell orders.",
    timeFrame: "The validity of this order. Maximum is 7 days."
  };

  const validateForm = () => {
    const fields = [
      { name: 'Entry Price', value: entryPrice },
      { name: 'Order Quantity', value: orderQuantity },
      { name: 'Target Price', value: targetPrice },
      { name: 'Stop Loss', value: stopLoss },
      { name: 'Time Frame', value: timeFrame }
    ];

    for (const field of fields) {
      if (field.value === '' || field.value === null || field.value === undefined) {
        setAlertInfo({ title: `${field.name} is required.` });
        return false;
      }

      if (parseFloat(field.value) < 0) {
        setAlertInfo({ title: `${field.name} cannot be negative.` });
        return false;
      }
    }

    const quantityValue = parseInt(orderQuantity, 10);
    if (isNaN(quantityValue) || quantityValue < 1 || quantityValue !== parseFloat(orderQuantity)) {
      setAlertInfo({ title: 'Order Quantity must be an integer and at least 1.' });
      return false;
    }

    const timeFrameValue = parseInt(timeFrame, 10);
    if (isNaN(timeFrameValue) || timeFrameValue < 1 || timeFrameValue > 7 || timeFrameValue !== parseFloat(timeFrame)) {
      setAlertInfo({ title: 'Time Frame must be between 1 and 7 days' });
      return false;
    }
    if ((orderType === 1 && stopLoss > entryPrice)) {
      if (orderType === 1) setAlertInfo({ title: 'Stop Loss must be less than or equal to entry price for buy orders' });
    }
    return true;
  };

  const clearForm = () => {
    setEntryPrice(lastPrice);
    setOrderQuantity('');
    setTargetPrice('');
    setStopLoss(0);
    setTimeFrame('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      clearForm();
      return;
    }
    if (!user) {
      loginWithRedirect();
      return;
    }

    const email = user.email;
    const finalEntryPrice = entryPrice || lastPrice;
    const finalStopLoss = stopLoss || 0;

    const orderData = {
      email,
      symbol,
      entryPrice: finalEntryPrice,
      orderQuantity: parseInt(orderQuantity, 10),
      targetPrice: parseFloat(targetPrice),
      stopLoss: finalStopLoss,
      orderType: orderType === 1 ? 'Buy' : 'Sell',
      timeFrame: parseInt(timeFrame, 10),
    };

    setOrderDetails(orderData);
    setShowConfirmModal(true);
  };

  const submitOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/order`, orderDetails, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setLoading(false);
      if (response.status === 201) {
        setOrderPlaced(true);
      } else {
        const res = await response.json();
        setAlertInfo({ title: `${res.error}` });
        navigate('/market');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setAlertInfo({ title: 'Error placing order. Please try again.' });
    } finally {
      setShowConfirmModal(false);
    }
  };

  if (isLoading || !isAuthenticated || loading) {
    return <Loading />;
  }
  if (orderPlaced) {
    return <Notification orderDetails={orderDetails} />;
  }

  return (
    <>
      <div className={styles.container}>
        <h3 style={{ color: 'black' }}>Place Order for <b>{symbol}</b></h3>
      </div>
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <p className={styles.title}>Order Details</p>
          <p className={styles.message} style={{ marginBottom: '5px' }}>Order type</p>
          <div className={styles.switchContainer}>
            <span className={styles.switchText}>Buy</span>
            <label className={styles.switch}>
              <input type="checkbox" checked={orderType === 2} onChange={handleOrderTypeChange} />
              <span className={styles.slider}></span>
            </label>
            <span className={styles.switchText}>Sell</span>
          </div>
          <div className={styles.flex}>
            <label>
              <input required placeholder="" type="number" className={styles.input} value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} />
              <span>Entry Price</span>
              <Tooltip text={tooltipMessages.entryPrice} />
            </label>
            <label>
              <input required placeholder="" type="number" className={styles.input} value={orderQuantity} onChange={(e) => setOrderQuantity(e.target.value)} />
              <span>Order Quantity</span>
              <Tooltip text={tooltipMessages.orderQuantity} />
            </label>
          </div>
          <div className={styles.flex}>
            <label>
              <input required placeholder="" type="number" className={styles.input} value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} />
              <span>Target Price</span>
              <Tooltip text={tooltipMessages.targetPrice} />
            </label>
            <label>
              <input required placeholder="" type="number" className={styles.input} value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
              <span>Stop Loss (Optional)</span>
              <Tooltip text={tooltipMessages.stopLoss} />
            </label>
          </div>
          <label>
            <input required placeholder="" type="number" className={styles.input} value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)} />
            <span>Time Frame (days)</span>
            <Tooltip text={tooltipMessages.timeFrame} />
          </label>
          <button type="submit" className={styles.submit}>Execute Order</button>
        </form>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          orderDetails={orderDetails}
          onConfirm={submitOrder}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
};

export default Order;
