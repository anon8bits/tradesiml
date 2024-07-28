import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Loading from './Loading.js';
import OrderCard from './OrderCard.js';
import CustomAlert from './CustomAlert.js';
import styles from './css/ViewOrders.module.css';
import styles2 from './css/PortfolioOverview.module.css';

const ViewOrders = () => {
    const { isAuthenticated, isLoading, user, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [openOrders, setOpenOrders] = useState([]);
    const [closedOrders, setClosedOrders] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showOpenOrders, setShowOpenOrders] = useState(true);
    const [amount, setAmount] = useState('');
    const [alert, setAlert] = useState(null);
    const cardsPerPage = 5;

    const handleAddMoney = async () => {
        const cleanAmount = amount.replace(/[,\s]/g, '');
        if (!/^\d+$/.test(cleanAmount) || parseInt(cleanAmount) < 1 || parseInt(cleanAmount) > 1000000) {
            setAlert({
                message: "Invalid amount! Amount should be an integer between 1 and 1,000,000",
                type: "error"
            });
            setAmount('');
            return;
        }
        const amountNum = parseInt(cleanAmount);
        try {
            const token = await getAccessTokenSilently({
                audience: 'https://tradesiml.tech/',
                scope: 'email'
            });
            const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/addMoney`,
                { amount: amountNum },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAmount('');
            if (response.status === 200) setAlert({message: "Money added successfully", type: "success" });
            const userResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/getUser`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserInfo(userResponse.data);
        } catch (error) {
            console.error('Error adding money:', error);
            setAlert({message: "Could not add money", type: "error" });
        }
    };

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect({ redirectUri: `${process.env.REACT_APP_FRONTEND}/market` });
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently({
                audience: 'https://tradesiml.tech/',
                scope: 'email'
            });
            try {
                const userResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/getUser`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const openOrdersResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/fetchOpenOrders`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const closedOrdersResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/fetchClosedOrders`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserInfo(userResponse.data);
                setOpenOrders(openOrdersResponse.data);
                setClosedOrders(closedOrdersResponse.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);
            }
        };

        if (user && user.email) {
            fetchData();
        }
    }, [user, getAccessTokenSilently]);

    const calculateUnrealizedPL = () => {
        return openOrders.reduce((total, order) => total + (order.PL || 0), 0);
    };

    function formatIndianCurrency(amount) {
        const num = Math.abs(amount);
        const integerPart = Math.floor(num);
        const decimalPart = (num - integerPart).toFixed(2).substring(2);

        let result = integerPart.toLocaleString('en-IN', {
            maximumFractionDigits: 0,
            useGrouping: true,
        });

        result += '.' + decimalPart;

        return amount < 0 ? `-₹${result}` : `₹${result}`;
    }

    const renderPLValue = (value) => {
        return (
            <span style={{
                color: value < 0 ? 'red' : value > 0 ? 'green' : 'inherit',
                marginLeft: '5px'
            }}>
                {value < 0 ? '-' : ''}
                {formatIndianCurrency(Math.abs(value))}
            </span>
        );
    };

    const orders = showOpenOrders ? openOrders : closedOrders;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = orders.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(orders.length / cardsPerPage);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={styles.orderContainer}>
            {userInfo && (
                <div>
                    <div className={styles2.card}>
                        <h2 className={styles.overviewTitle}>Portfolio Overview</h2>
                        <p className={styles2.infoText}>
                            <span className={styles2.infoIconWrapper}>
                                <span className={styles2.infoIcon}>i</span>
                                <span className={styles2.tooltipText}>
                                    The amount of funds currently available in your account for trading
                                </span>
                            </span>
                            Current Balance: {formatIndianCurrency(userInfo.balance)}
                        </p>
                        <p className={styles2.infoText}>
                            <span className={styles2.infoIconWrapper}>
                                <span className={styles2.infoIcon}>i</span>
                                <span className={styles2.tooltipText}>
                                    The sum of realized profit/loss across all your trades
                                </span>
                            </span>
                            Total P/L: {renderPLValue(userInfo.netPL)}
                        </p>
                        <p className={styles2.infoText}>
                            <span className={styles2.infoIconWrapper}>
                                <span className={styles2.infoIcon}>i</span>
                                <span className={styles2.tooltipText}>
                                    Potential profit/loss from open positions if they were closed at current market prices
                                </span>
                            </span>
                            Unrealized P/L: {renderPLValue(calculateUnrealizedPL())}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <div className={styles2.inputContainer} style={{ flex: 1 }}>
                            <input
                                placeholder="Add trading balance"
                                className={styles2.inputField}
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <label htmlFor="input-field" className={styles2.inputLabel}>Enter amount (Max. ₹10,00,000)</label>
                            <span className={styles2.inputHighlight}></span>
                        </div>
                        <button className={styles2.button} onClick={handleAddMoney} style={{ marginLeft: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" className={styles2.svgIcon}>
                                <g strokeWidth="1.5" strokeLinecap="round" stroke="#de8a2a">
                                    <circle r="7.5" cy="10" cx="10"></circle>
                                    <path d="m9.99998 7.5v5"></path>
                                    <path d="m7.5 9.99998h5"></path>
                                </g>
                            </svg>
                            <span className={styles2.lable}>Add</span>
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.switchContainer}>
                <button
                    className={`${styles.switchButton} ${showOpenOrders ? styles.active : ''}`}
                    onClick={() => setShowOpenOrders(true)}
                >
                    Open Orders
                </button>
                <button
                    className={`${styles.switchButton} ${!showOpenOrders ? styles.active : ''}`}
                    onClick={() => setShowOpenOrders(false)}
                >
                    Closed Orders
                </button>
            </div>

            {currentCards.length > 0 ? (
                currentCards.map((order) => (
                    <OrderCard
                        key={order._id}
                        order={order}
                        status={showOpenOrders ? 'open' : 'closed'}
                    />
                ))
            ) : (
                <div className={styles.emptyMessage}>
                    <p>{showOpenOrders ? 'No open orders' : 'No closed orders'} to display.</p>
                </div>
            )}

            {currentCards.length > 0 && <div className={styles.pagination}>
                <button
                    onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo(0, 0); }}
                    disabled={currentPage === 1}
                    className={`${styles.button} ${currentPage === 1 ? styles.disabled : ''}`}
                >
                    Previous
                </button>
                <div className={styles.pageNumbersContainer}>
                    {[...Array(totalPages)].map((_, number) => (
                        <button
                            key={number + 1}
                            onClick={() => { setCurrentPage(number + 1); window.scrollTo(0, 0); }}
                            className={`${styles.pageLink} ${currentPage === number + 1 ? styles.active : ''}`}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo(0, 0); }}
                    disabled={currentPage === totalPages}
                    className={`${styles.button} ${currentPage === totalPages ? styles.disabled : ''}`}
                >
                    Next
                </button>
            </div>}
            {alert && (
                <CustomAlert
                    message={alert.message}
                    onClose={() => setAlert(null)}
                    type={alert.type}
                />
            )}
        </div>
    );
};

export default ViewOrders;