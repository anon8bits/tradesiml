import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './css/stockDetail.module.css';
import axios from 'axios';
import CustomAlert from './CustomAlert.js';
import { StockContext } from './context/StockContext.js';
import { useAuth0 } from '@auth0/auth0-react';

const StockDetail = () => {
    const { Symbol } = useParams();
    const navigate = useNavigate();
    const [stockDetails, setStockDetails] = useState(null);
    const { handleStockSelection } = useContext(StockContext);
    const { isAuthenticated, loginWithPopup } = useAuth0();
    const [alertInfo, setAlertInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/stockDetail/${Symbol}`);
                if (!response.data) setAlertInfo({ title: `No stock named ${Symbol} found!` });
                setStockDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [Symbol]);

    useEffect(() => {
        if (stockDetails === null) {
            const timeoutId = setTimeout(() => {
                navigate('/market');
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [stockDetails, navigate]);

    const handleClick = async () => {
        handleStockSelection(stockDetails.Symbol, stockDetails.LTP);
        if (isAuthenticated) {
            navigate('/order');
        } else {
            loginWithPopup({ redirectUri: `${process.env.REACT_APP_FRONTEND}/market/${Symbol}` });
        }
    };

    const handleBack = () => {
        navigate('/market');
    }

    return (
        <div>
            {alertInfo && (
                <CustomAlert
                    title={alertInfo.title}
                    onClose={() => setAlertInfo(null)}
                />
            )}
            {stockDetails !== null ? (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <button className={styles.backButton} onClick={handleBack}>
                            ← Return
                        </button>
                        <div className={styles.content}>
                            <div className={styles.title}>{stockDetails.Name}</div>
                            <div className={styles.item}>
                                <span className={styles.property}>Symbol: </span> {stockDetails.Symbol}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>Percent Change: </span>
                                <span className={`${styles.value} ${stockDetails.PercentChange < 0 ? styles.negative : ''}`}>
                                    {stockDetails.PercentChange}%
                                </span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>LTP: </span> ₹{stockDetails.LTP}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>Net Change: </span>
                                <span className={`${styles.value} ${stockDetails.NetChange < 0 ? styles.negative : ''}`}>
                                    {stockDetails.NetChange < 0 ? `-₹${Math.abs(stockDetails.NetChange)}` : `₹${stockDetails.NetChange}`}
                                </span>
                            </div>

                            <div className={styles.item}>
                                <span className={styles.property}>Total Volume: </span> {stockDetails.TotalVolume}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>Volume: </span> {stockDetails.Volume}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>High: </span> ₹{stockDetails.High}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>Low: </span> ₹{stockDetails.Low}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>Open: </span> ₹{stockDetails.Open}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>Previous Close (PClose): </span> ₹{stockDetails.PClose}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>52 Week High: </span> ₹{stockDetails.Week52High}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>52 Week Low: </span> ₹{stockDetails.Week52Low}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>5 Year High: </span> ₹{stockDetails.Year5High}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>1 Month High: </span> ₹{stockDetails.Month1High}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>3 Month High: </span> ₹{stockDetails.Month3High}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>6 Month High: </span> ₹{stockDetails.Month6High}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>Date and Time: </span> {new Date(stockDetails.DateTime).toLocaleString()}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>ISIN: </span> {stockDetails.ISIN}
                            </div>
                        </div>
                        <button className={styles.button} onClick={handleClick}>Buy/Sell</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default StockDetail;
