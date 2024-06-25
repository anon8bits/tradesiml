import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Loading from './Loading.js';
import OrderCard from './OrderCard.js';
import styles from './css/ViewOrders.module.css';

const ViewOrders = () => {
    const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
    const [orders, setOrders] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showClosedOrders, setShowClosedOrders] = useState(false);
    const [openOrdersCount, setOpenOrdersCount] = useState(0);
    const [closedOrdersCount, setClosedOrdersCount] = useState(0);
    const cardsPerPage = 4;

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
                setUserInfo(userResponse.data);

                const openOrdersResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/fetchOpenOrders`, {
                    params: { email: user.email }
                });
                setOpenOrdersCount(openOrdersResponse.data.length);
                setOrders(openOrdersResponse.data);

                const closedOrdersResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/fetchClosedOrders`, {
                    params: { email: user.email }
                });
                setClosedOrdersCount(closedOrdersResponse.data.length);

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

    const toggleOrderType = async () => {
        setShowClosedOrders(!showClosedOrders);
        setLoading(true);
        try {
            const endpoint = showClosedOrders ? 'fetchOpenOrders' : 'fetchClosedOrders';
            const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/${endpoint}`, {
                params: { email: user.email }
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        setLoading(false);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                <div className={styles.userInfo}>
                    <h2 className={styles.overviewTitle}>Portfolio Overview</h2>
                    <p>Current Balance: ₹{userInfo.balance}</p>
                    <p>Total P/L: ₹{userInfo.netPL}</p>
                    <p>Open Orders: {openOrdersCount}</p>
                    <p>Closed Orders: {closedOrdersCount}</p>
                </div>
            )}

            <div className={styles.toggleContainer}>
                <input
                    type="checkbox"
                    id="orderTypeToggle"
                    hidden
                    checked={showClosedOrders}
                    onChange={toggleOrderType}
                />
                <label htmlFor="orderTypeToggle" className={styles.toggle}>
                    O
                    <div className={styles.toggleSwitch}>
                        <div className={styles.toggleCircle}></div>
                    </div>
                    C
                </label>
            </div>

            <div className={styles.cardContainer}>
                {currentCards.length > 0 ? (
                    currentCards.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
            <div className={styles.pagination}>
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
            </div>
        </div>
    );
};

export default ViewOrders;