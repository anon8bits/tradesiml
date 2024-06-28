import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Loading from './Loading.js';
import OrderCard from './OrderCard.js';
import styles from './css/ViewOrders.module.css';
import styles2 from './css/PortfolioOverview.module.css';

const ViewOrders = () => {
    const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
    const [openOrders, setOpenOrders] = useState([]);
    const [closedOrders, setClosedOrders] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showOpenOrders, setShowOpenOrders] = useState(true);
    const cardsPerPage = 5;

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect({ redirectUri: `${process.env.REACT_APP_FRONTEND}/market` });
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/getUser`, {
                    params: { email: user.email }
                });
                const openOrdersResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/fetchOpenOrders`, {
                    params: { email: user.email }
                });
                const closedOrdersResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/fetchClosedOrders`, {
                    params: { email: user.email }
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
    }, [user]);

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
                                The sum of realized and unrealized profit/loss across all your trades
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
        </div>
    );
};

export default ViewOrders;