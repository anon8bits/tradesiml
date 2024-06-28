import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading.js';
import NotFoundComponent from './Missing.js';
import CustomNotification from './CustomNotification.js';
import styles from './css/OrderDetails.module.css';

const OrderDetails = () => {
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const { status, orderID } = useParams();
    const [error, setError] = useState(null);
    const [cancelled, setCancelled] = useState(false);
    const [executed, setExecuted] = useState(false);
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect({ redirectUri: `${process.env.REACT_APP_FRONTEND}/market` });
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const email = user.email;
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/${status}/${orderID}/${email}`);
                setOrderDetails(response.data);
                setLoading(false);
            } catch (error) {
                setError(1);
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };
        if (user && user.email) {
            fetchDetails();
        }
    }, [user]);

    if (isLoading || loading) {
        return <Loading />;
    }

    if (error === 1) {
        return <NotFoundComponent />;
    }

    if (status !== 'open' && status !== 'closed') {
        return <NotFoundComponent />;
    }

    if (cancelled) {
        return <CustomNotification title={'Order Cancelled Successfully!'} message={`Your ${orderDetails.type} order for ${orderDetails.orderQuantity} stocks of ${orderDetails.stockName} has been cancelled`} />
    }

    if (executed) {
        return <CustomNotification title={'Order Executed Successfully!'} message={`Your ${orderDetails.type} order for ${orderDetails.orderQuantity} stocks of ${orderDetails.stockName} has been executed `} />
    }

    const formatNumber = (num) => {
        return Number(num).toFixed(2);
    };

    const cancelOrder = async () => {
        setLoading(true);
        try {
            const email = user.email;
            const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/cancelOrder/${orderID}/${email}`);
            setLoading(false);
            if (response.status === 200) {
                setCancelled(true);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    const executeNow = async () => {
        setLoading(true);
        try {
            const email = user.email;
            const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/executenow/${orderID}/${email}`);
            setLoading(false);
            if (response.status === 200) {
                setExecuted(true);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    const renderButton = () => {
        if (!orderDetails.triggered && status === 'open') {
            return (
                <button className={`${styles.button} ${styles.redButton}`} onClick={cancelOrder}>
                    Cancel Order
                </button>
            );
        } else if (orderDetails.type === 'Buy' && status === 'open') {
            return (
                <button className={`${styles.button} ${styles.redButton}`} onClick={executeNow}>
                    Sell Now
                </button>
            );
        } else if (orderDetails.type === 'Sell' && status === 'open') {
            return (
                <button className={`${styles.button} ${styles.greenButton}`} onClick={executeNow}>
                    Buy Back Now
                </button>
            );
        }
        return null;
    };

    return (
        <>
            {orderDetails !== null ? (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <h2 className={styles.title}>{orderDetails.stockName} Order Details</h2>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Order ID:</span>
                            <span className={styles.detailValue}>{orderID}</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Stock Name:</span>
                            <span className={styles.detailValue}>{orderDetails.stockName}</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Type:</span>
                            <span className={styles.detailValue}>{orderDetails.type}</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Quantity:</span>
                            <span className={styles.detailValue}>{orderDetails.orderQuantity}</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Entry Price:</span>
                            <span className={styles.detailValue}>₹{formatNumber(orderDetails.entryPrice)}</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Target Price:</span>
                            <span className={styles.detailValue}>₹{formatNumber(orderDetails.targetPrice)}</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Stop Loss:</span>
                            <span className={styles.detailValue}>₹{formatNumber(orderDetails.stopLoss)}</span>
                        </div>

                        <div className={styles.detail}>
                            <span className={styles.detailName}>{status === 'open' ? 'Unrealized P/L:' : 'Realized P/L:'}</span>
                            <span className={orderDetails.PL < 0 ? styles.loss : styles.profit}>
                                ₹{formatNumber(orderDetails.PL)}
                            </span>
                        </div>
                        {renderButton()}
                    </div>
                </div>
            ) : <Loading />}
        </>
    );
};

export default OrderDetails;