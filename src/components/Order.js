// Order.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './css/Order.module.css';
import CustomAlert from './CustomAlert.js';
import Tooltip from './InfoToolTip.js';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading.js';
import Notification from './Notification.js';
import ConfirmModal from './ConfirmModal.js'
import NotFoundComponent from './Missing.js';

const Order = () => {
  const { isAuthenticated, loginWithRedirect, isLoading, user, getAccessTokenSilently } = useAuth0();
  const [alertInfo, setAlertInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();
  const { symbol } = useParams();
  const [entryPrice, setEntryPrice] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLoss, setStopLoss] = useState(0);
  const [orderType, setOrderType] = useState(1); // 1 for buy, 2 for sell
  const [timeFrame, setTimeFrame] = useState('');
  const [notFound, setNotFound] = useState(null)

  const lastPrice = stockData ? stockData.LTP : '';

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({ redirectUri: `${process.env.REACT_APP_FRONTEND}/market/order` });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/stockDetail/${symbol}`, {
          withCredentials: true,
        });
        if (!response) {
          setAlertInfo({ message: `No stock named ${Symbol} found!`, type: 'error' });
          setNotFound(true);
        } else {
          setStockData(response.data);
          setEntryPrice(response.data.LTP);
        }
      } catch (error) {
        setAlertInfo({ message: 'Server Error!', type: 'error' });
        setNotFound(true);
      }
    }
    fetchStockData();
  }, [symbol]);

  if (notFound) {
    return <NotFoundComponent />;
  }

  const handleOrderTypeChange = () => {
    setOrderType((prevType) => (prevType === 1 ? 2 : 1));
  };

  const tooltipMessages = {
    entryPrice: "The price at which you want to enter the trade. By default, it's current market price.",
    orderQuantity: "The number of shares you want to trade. Must be a positive integer.",
    targetPrice: "The price at which you want to take profit. Must be higher than entry price for buy orders, lower for short short sell orders.",
    stopLoss: "The price at which order gets automatically triggered to reduce losses. Must be lower than entry price for buy orders, higher for short sell orders.",
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
        setAlertInfo({ message: `${field.name} is required.`, type: 'error' });
        return false;
      }

      if (parseFloat(field.value) < 0) {
        setAlertInfo({ message: `${field.name} cannot be negative.`, type: 'error' });
        return false;
      }
    }

    const quantityValue = parseInt(orderQuantity, 10);
    if (isNaN(quantityValue) || quantityValue < 1 || quantityValue !== parseFloat(orderQuantity)) {
      setAlertInfo({ message: 'Order Quantity must be an integer and at least 1.', type: 'error' });
      return false;
    }

    const timeFrameValue = parseInt(timeFrame, 10);
    if (isNaN(timeFrameValue) || timeFrameValue < 1 || timeFrameValue > 7 || timeFrameValue !== parseFloat(timeFrame)) {
      setAlertInfo({ message: 'Time Frame must be between 1 and 7 days', type: 'error' });
      return false;
    }
    if ((orderType === 1 && stopLoss > entryPrice)) {
      if (orderType === 1) setAlertInfo({ message: 'Stop Loss must be less than or equal to entry price for buy orders', type: 'error' });
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
    const finalEntryPrice = entryPrice || lastPrice;
    const finalStopLoss = stopLoss || 0;

    const orderData = {
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
      const token = await getAccessTokenSilently({
        audience: 'https://tradesiml.tech/',
        scope: 'email'
      });
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/order`, orderDetails, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(false);
      if (response.status === 201) {
        setOrderPlaced(true);
      } else {
        const res = await response.json();
        setAlertInfo({ message: `${res.error}`, type: 'error' });
        navigate('/market');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setAlertInfo({ message: 'Error placing order. Please try again.', type: 'error' });
    } finally {
      setShowConfirmModal(false);
    }
  };

  if (isLoading || !isAuthenticated || loading || !stockData) {
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
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
          type={alertInfo.type}
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
            <span className={styles.switchText}>Short Sell</span>
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
