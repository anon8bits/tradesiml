import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading.js';
import NotFoundComponent from './Missing.js';
import CustomNotification from './CustomNotification.js';
import CustomAlert from './CustomAlert.js';
import styles from './css/OrderDetails.module.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, action }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Confirm Action</h2>
                <p>Are you sure you want to {action}?</p>
                <div className={styles.modalButtons}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

const OrderDetails = () => {
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const { status, orderID } = useParams();
    const [error, setError] = useState(null);
    const [cancelled, setCancelled] = useState(false);
    const [executed, setExecuted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [alert, setAlert] = useState(null);
    const { user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect({ redirectUri: `${process.env.REACT_APP_FRONTEND}/market` });
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = await getAccessTokenSilently({
                    audience: 'https://tradesiml.tech/',
                    scope: 'email'
                });
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/${status}/${orderID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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
    }, [user, status, orderID, getAccessTokenSilently]);

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const cancelOrder = () => {
        setModalAction('cancel this order');
        setShowModal(true);
    };

    const executeNow = () => {
        const action = orderDetails.type === 'Buy' ? 'sell' : 'buy back';
        setModalAction(`${action} now`);
        setShowModal(true);
    };

    const handleConfirm = async () => {
        setShowModal(false);
        setLoading(true);
        try {
            const token = await getAccessTokenSilently({
                audience: 'https://tradesiml.tech/',
                scope: 'email'
            });
            let response;
            if (modalAction === 'cancel this order') {
                response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/cancelOrder/${orderID}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setCancelled(true);
                }
            } else {
                response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/executenow/${orderID}`, {}, {
                    headers: {
                        "Content-Type": 'application-json',
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setExecuted(true);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setAlert({
                title: 'Error',
                message: `Failed to ${modalAction}. Please try again later.`
            });
        } finally {
            setLoading(false);
        }
    };

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
                        {status === 'closed' && (
                            <div className={styles.detail}>
                                <span className={styles.detailName}>Status:</span>
                                <span className={styles.detailValue}>{orderDetails.status}</span>
                            </div>
                        )}
                        {status === 'open' && (
                            <div className={styles.detail}>
                                <span className={styles.detailName}>Triggered:</span>
                                <span className={styles.detailValue}>{orderDetails.triggered ? 'Yes' : 'No'}</span>
                            </div>
                        )}
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Stock Name:</span>
                            <span className={styles.detailValue}>{orderDetails.stockName}</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Type:</span>
                            <span className={styles.detailValue}>{orderDetails.type}</span>
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
                            <span className={styles.detailName}>Quantity:</span>
                            <span className={styles.detailValue}>{orderDetails.orderQuantity}</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Stop Loss:</span>
                            <span className={styles.detailValue}>₹{formatNumber(orderDetails.stopLoss)}</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailName}>Order Start Time:</span>
                            <span className={styles.detailValue}>{formatDate(orderDetails.OrderStartTime)}</span>
                        </div>
                        {status === 'closed' && (
                            <div className={styles.detail}>
                                <span className={styles.detailName}>Order Close Time:</span>
                                <span className={styles.detailValue}>{formatDate(orderDetails.OrderCloseTime)}</span>
                            </div>
                        )}
                        {status === 'open' && !orderDetails.triggered && (
                            <div className={styles.detail}>
                                <span className={styles.detailName}>Validity:</span>
                                <span className={styles.detailValue}>{orderDetails.validity}</span>
                            </div>
                        )}
                        {renderButton()}
                    </div>
                </div>
            ) : <Loading />}
            <ConfirmationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                action={modalAction}
            />
            {alert && (
                <CustomAlert
                    title={alert.title}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
        </>
    );
};

export default OrderDetails;