import React from 'react';
import styles from './css/OrderCard.module.css';

const OrderCard = ({ order }) => {
    return (
        <div className={styles.book}>
            <div className={styles.details}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Entry Price:</strong> ₹{order.entryPrice.toFixed(2)}</p>
                <p><strong>Target Price:</strong> ₹{order.targetPrice.toFixed(2)}</p>
                <p><strong>Stop Loss:</strong> ₹{order.stopLoss.toFixed(2)}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderStartTime).toLocaleString()}</p>
                <p><strong>Valid Until:</strong> {new Date(order.validity).toLocaleString()}</p>
                <p><strong>Status:</strong> {order.triggered ? 'Triggered' : 'Not Triggered'}</p>
            </div>
            <div className={styles.cover}>
                <div className={styles.coverContent}>
                    <p>Stock : {order.stockName}</p>
                    <p>Type: {order.type}</p>
                    <p>Quantity: {order.orderQuantity}</p>
                    <p>P/L: ₹{order.PL}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;