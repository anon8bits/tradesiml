// StockDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StockDetail = ({ stocksData }) => {
    const { symbol } = useParams();
    const [stockDetails, setStockDetails] = useState(null);

    useEffect(() => {
        // Find the stock with the matching symbol from the stocksData array
        const selectedStock = stocksData.find(stock => stock.symbol === symbol);

        if (selectedStock) {
            setStockDetails(selectedStock);
        }
    }, [symbol, stocksData]);

    return (
        <div className="container mt-4">
            <h2>Stock Details</h2>
            {stockDetails ? (
                <>
                    <p>Symbol: {stockDetails.symbol}</p>
                    <p>Identifier: {stockDetails.identifier}</p>
                    <p>Open: {stockDetails.open}</p>
                    <p>Day High: {stockDetails.dayHigh}</p>
                    <p>Day Low: {stockDetails.dayLow}</p>
                    {/* Add more details as needed */}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StockDetail;
