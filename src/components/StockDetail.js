import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStock } from './context/StockContext.js';
import styles from './stockDetail.module.css';
import { useOrder } from './context/OrderContext.js';

const StockDetail = () => {
    const { selectedIndex, selectedStock: contextSelectedStock } = useStock();
    // console.log('Index: ', selectedIndex)
    // console.log('Stock: ', contextSelectedStock.symbol)
    const [stockDetails, setStockDetails] = useState(null);
    const navigate = useNavigate();
    const {symbol, setSymbol, price, setPrice}  = useOrder();
    useEffect(() => {
        try {
            const indexData = JSON.parse(localStorage.getItem(selectedIndex));
            if (indexData) {    
                const selectedStockFromLocalStorage = indexData.find(item => item.symbol === contextSelectedStock.symbol);
                if (selectedStockFromLocalStorage) {
                    setStockDetails(selectedStockFromLocalStorage);
                } else {
                    console.error("Selected stock not found in localStorage.");
                }
            } else {
                console.error("Index data not found in localStorage.");
            }
        } catch (error) {
            console.error("Error retrieving data from localStorage:", error);
        }
    }, [selectedIndex, contextSelectedStock]);

    const handleClick = () => {
        setSymbol(contextSelectedStock.symbol); 
        setPrice(stockDetails.lastPrice);
        navigate('/order');
    };
    

    return (
        <div>
            {stockDetails !== null ? (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.content}>
                            <div className={styles.title}>{stockDetails.symbol}</div>
                            <div className={styles.price}>Open: {stockDetails.open}</div>
                            <div className={styles.price}>Day High: {stockDetails.dayHigh}</div>
                            <div className={styles.price}>Day Low: {stockDetails.dayLow}</div>
                            <div className={styles.price}>Last Price: {stockDetails.lastPrice}</div>
                            <div className={styles.price}>Previous Close: {stockDetails.previousClose}</div>
                            <div className={styles.price}>Change: {stockDetails.change}</div>
                            <div className={styles.price}>% Change: {stockDetails.pChange}</div>
                            <div className={styles.price}>Year High: {stockDetails.yearHigh}</div>
                            <div className={styles.price}>Year Low: {stockDetails.yearLow}</div>
                            <div className={styles.price}>Total Traded Volume: {stockDetails.totalTradedVolume}</div>
                            <div className={styles.price}>Total Traded Value: {stockDetails.totalTradedValue}</div>
                            <div className={styles.price}>Last Update Time: {stockDetails.lastUpdateTime}</div>
                            <div className={styles.price}>% Change (365 days): {stockDetails.perChange365d}</div>
                            <div className={styles.price}>% Change (30 days): {stockDetails.perChange30d}</div>
                        </div>
                        <button className={styles.button} onClick={handleClick}>Buy now</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StockDetail;