import React, { useState, useEffect } from 'react';
import { useStock } from './StockContext.js';

const StockDetail = (props) => {
    const { selectedIndex, selectedStock: contextSelectedStock } = useStock();
    const [stockDetails, setStockDetails] = useState(null);
    useEffect(() => {
        const indexData = JSON.parse(localStorage.getItem(selectedIndex));
        const selectedStockFromLocalStorage = indexData.find(item => item.symbol === contextSelectedStock.symbol);
        setStockDetails(selectedStockFromLocalStorage);
    }, [selectedIndex, contextSelectedStock]);


    return (
        <div>
            {stockDetails ? (
                <div>
                    <h2>{stockDetails.symbol}</h2>
                    <p>Price: {stockDetails.open}</p>
                    <p>Volume: {stockDetails.change}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StockDetail;
