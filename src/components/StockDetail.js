import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './css/stockDetail.module.css';
import axios from 'axios';
import TradingViewWidget from './Widgets/Fundamentals.js';
import TradingViewTechnicalWidget from './Widgets/TechnicalAnalysis.js';
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
    const formattedSymbol = Symbol.replace(/-/g, '_');
    const openTradingViewChart = () => {
        window.open(`https://in.tradingview.com/chart/?symbol=NSE%3A${formattedSymbol}`, '_blank');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/stockDetail/${Symbol}`);
                if (!response.data) setAlertInfo({ message: `No stock named ${Symbol} found!`, type: 'error' });
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
            navigate(`/order/${Symbol}`);
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
                    message={alertInfo.message}
                    type={alertInfo.type}
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
                                <span className={`${styles.value} ${stockDetails.PercentChange < 0 ? styles.negative : styles.positive}`}>
                                    {stockDetails.PercentChange < 0 ? (
                                        <>
                                            {`${stockDetails.PercentChange}%`}
                                            <span className={styles.iconWrapper}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="12.5" viewBox="0 0 320 512">
                                                    <path fill="#e63333" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                                </svg>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {`${stockDetails.PercentChange}%`}
                                            <span className={styles.iconWrapper}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="12.5" viewBox="0 0 320 512">
                                                    <path fill="#196d08" d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                                                </svg>
                                            </span>
                                        </>
                                    )}
                                </span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>LTP: </span> ₹{stockDetails.LTP}
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>Net Change: </span>
                                <span className={`${styles.value} ${stockDetails.NetChange < 0 ? styles.negative : styles.positive}`}>
                                    {stockDetails.NetChange < 0 ? (
                                        <>
                                            {`-₹${Math.abs(stockDetails.NetChange)}`}
                                            <span className={styles.iconWrapper}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="12.5" viewBox="0 0 320 512"><path fill="#e63333" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {`₹${stockDetails.NetChange}`}
                                            <span className={styles.iconWrapper}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="12.5" viewBox="0 0 320 512"><path fill="#196d08" d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" /></svg>
                                            </span>
                                        </>
                                    )}
                                </span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.property}>Total Volume: </span> {stockDetails.TotalVolume}
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
                                <span className={styles.property}>ISIN: </span> {stockDetails.ISIN}
                            </div>
                        </div>
                        <button className={`${styles.button} ${styles.tradingViewButton}`} onClick={openTradingViewChart}>
                            View Chart <span className={styles.outlink}>↗</span>
                        </button>
                        <button className={styles.button} onClick={handleClick}>Buy/Sell</button>
                    </div>
                    <div className={styles.technicalAnalysis}>
                        <h2><strong>Technical Analysis</strong></h2>
                        <TradingViewTechnicalWidget symbol={`NSE:${formattedSymbol}`} />
                    </div>
                    <div className={styles.fundamentals}>
                        <h2><strong>Fundamentals</strong></h2>
                        <TradingViewWidget symbol={`NSE:${formattedSymbol}`} />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default StockDetail;
