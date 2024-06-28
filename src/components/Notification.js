import React from 'react';
import styles from './css/Notification.module.css';
import { useNavigate } from 'react-router-dom';

const Notification = ({ orderDetails }) => {
    const navigate = useNavigate();

    const handleViewPortfolio = () => {
        navigate('/portfolio'); 
    };

    const handleDismiss = () => {
        navigate('/market'); 
    };

    return (
        <div className={styles['notifications-container']}>
            <div className={styles.success}>
                <div className={styles.flex}>
                    <div className={styles['flex-shrink-0']}>
                        <svg className={styles['succes-svg']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <div className={styles['success-prompt-wrap']}>
                        <p className={styles['success-prompt-heading']}>Order Placed</p>
                        <div className={styles['success-prompt-prompt']}>
                            <p>Your {orderDetails.orderType} order for {orderDetails.orderQuantity} shares of {orderDetails.symbol} has been successfully placed.</p>
                            <ul>
                                <li>Entry Price: ₹{parseFloat(orderDetails.entryPrice)}</li>
                                <li>Target Price: ₹{parseFloat(orderDetails.targetPrice)}</li>
                                {orderDetails.stopLoss > 0 && (
                                    <li>Stop Loss: ₹{parseFloat(orderDetails.stopLoss)}</li>
                                )}
                            </ul>
                            <p>This trade will reflect in your paper trading portfolio.</p>
                        </div>
                        <div className={styles['success-button-container']}>
                            <button type="button" className={styles['success-button-main']} onClick={handleViewPortfolio}>View Portfolio</button>
                            <button type="button" className={styles['success-button-secondary']} onClick={handleDismiss}>Dismiss</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notification;