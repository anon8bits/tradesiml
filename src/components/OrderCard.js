import React from 'react';
import styles from './css/OrderCard.module.css';
import { Link } from 'react-router-dom';

const OrderCard = ({ order, status }) => {
    const formatNumber = (num) => {
        return Number(num).toFixed(2);
    };

    const formatCurrency = (amount) => {
        return `₹${formatNumber(Math.abs(amount))}`;
    };

    const plColor = order.PL < 0 ? 'red' : order.PL > 0 ? 'green' : 'inherit';
    const formattedPL = order.PL < 0
        ? `-${formatCurrency(order.PL)}`
        : formatCurrency(order.PL);
    const plLabel = status === 'open' ? 'Unrealized P/L' : 'Realized P/L';

    return (
        <div className={styles.card}>
            <div className={styles.cardDetails}>
                <p className={styles.textTitle}>{order.stockName}</p>
                <p className={styles.textBody}>
                    <strong>Type:</strong> {order.type === 'Sell' ? 'Short sell' : order.type}
                </p>
                <p className={styles.textBody}><strong>Quantity:</strong> {formatNumber(order.orderQuantity)}</p>
                <p className={styles.textBody}><strong>Entry Price: </strong> {formatCurrency(order.entryPrice)}</p>
                <p className={styles.textBody}>
                    <strong>{plLabel}: </strong>
                    <span style={{ color: plColor }}>{formattedPL}</span>
                </p>
            </div>
            <Link className={styles.cardButton} to={`/orderdetails/${status}/${order._id}`}>Order Details</Link>
        </div>
    );
};

export default OrderCard;