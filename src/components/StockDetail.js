import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './css/stockDetail.module.css';
import axios from 'axios';
import Alert from './Alert.js';
import { StockContext } from './context/StockContext.js';

const StockDetail = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const [stockDetails, setStockDetails] = useState(null);
    const { handleStockSelection } = useContext(StockContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/stockDetail/${symbol}`);
                setStockDetails(response.data);
            } catch (error) {
                console.error(error);
                //alert("Failed to fetch stock data. Please try again later.");
            }
        };

        fetchData();
    }, [symbol]);

    useEffect(() => {
        if (stockDetails === null) {
            const timeoutId = setTimeout(() => {
                navigate('/market');
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [stockDetails, navigate]);

    const handleClick = () => {
        handleStockSelection(stockDetails.symbol, stockDetails.lastPrice);
        navigate('/order');
    };


    return (
        <div>
            {stockDetails === null && <Alert alert={{ type: 'danger', message: 'No stock data found. Redirecting back to Market...' }} />}
            {stockDetails !== null ? (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.content}>
                            <div className={styles.title}>{stockDetails.symbol}</div>
                            <div className={styles.price}>Open: {stockDetails.open.toFixed(2)}</div>
                            <div className={styles.price}>Day High: {stockDetails.dayHigh.toFixed(2)}</div>
                            <div className={styles.price}>Day Low: {stockDetails.dayLow.toFixed(2)}</div>
                            <div className={styles.price}>Last Price: {stockDetails.lastPrice.toFixed(2)}</div>
                            <div className={styles.price}>Previous Close: {stockDetails.previousClose.toFixed(2)}</div>
                            <div className={styles.price}>Change: {stockDetails.change.toFixed(2)}</div>
                            <div className={styles.price}>% Change: {stockDetails.pChange.toFixed(2)}</div>
                            <div className={styles.price}>Year High: {stockDetails.yearHigh.toFixed(2)}</div>
                            <div className={styles.price}>Year Low: {stockDetails.yearLow.toFixed(2)}</div>
                            <div className={styles.price}>Total Traded Volume: {stockDetails.totalTradedVolume.toFixed(2)}</div>
                            <div className={styles.price}>Total Traded Value: {stockDetails.totalTradedValue.toFixed(2)}</div>
                            <div className={styles.price}>Last Update Time: {stockDetails.lastUpdateTime}</div>
                            <div className={styles.price}>% Change (365 days): {stockDetails.perChange365d.toFixed(2)}</div>
                            <div className={styles.price}>% Change (30 days): {stockDetails.perChange30d.toFixed(2)}</div>
                        </div>
                        <button className={styles.button} onClick={handleClick}>Buy/Sell</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default StockDetail;
