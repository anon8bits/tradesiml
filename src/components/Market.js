import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Market = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState('NIFTY 50');
    const [currentPage, setCurrentPage] = useState(1);
    const stocksPerPage = 20;
    const fetchStockData = async () => {
        const options = {
            method: 'GET',
            url: 'https://latest-stock-price.p.rapidapi.com/price',
            params: {
                Indices: selectedIndex
            },
            headers: {
                'X-RapidAPI-Key': '76849e1e22msh237b2a51eb428a7p141245jsn3fa09fb60d0d',
                'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setStocks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStockData();
    }, [selectedIndex]);

    const handleClick = (stock) => {
        setSelectedStock(stock);
    };

    const handleIndexChange = (event) => {
        setSelectedIndex(event.target.value);
    };

    const renderStockCards = () => {
        const indexOfLastStock = currentPage * stocksPerPage;
        const indexOfFirstStock = indexOfLastStock - stocksPerPage;
        const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

        return (
            <div className="container mt-4">
                <h1 className="text-center mb-4">Stock Market</h1>
                <div className="row">
                    {currentStocks.map((stock) => (
                        <div key={stock.symbol} className="col-md-4 mb-4">
                            <div className="card" onClick={() => handleClick(stock)}>
                                <div className="card-body">
                                    <h5 className="card-title">{stock.symbol}</h5>
                                    <p className="card-text">Last Price: ₹{stock.lastPrice}</p>
                                    <p className="card-text">Change: {stock.change < 0 ? `- ₹ ${Math.abs(stock.change)}` : `₹ ${stock.change}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <span>{currentPage}</span>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastStock >= stocks.length}>Next</button>
                </div>
            </div>
        );
    };

    const renderStockDetails = () => {
        if (selectedStock) {
            return (
                <div className="mt-4">
                    <h2>Stock Details</h2>
                    <p>Symbol: {selectedStock.symbol}</p>
                    <p>Identifier: {selectedStock.identifier}</p>
                    {/* Add more details as needed */}
                </div>
            );
        }
        return null;
    };

    const indexOptions = [
        'NIFTY 50',
        'NIFTY NEXT 50',
        'NIFTY 100',
        'NIFTY 200',
        'NIFTY 500',
        'NIFTY MIDCAP 50',
        'NIFTY MIDCAP 100',
        'NIFTY MIDCAP 150',
        'NIFTY SMLCAP 50',
        'NIFTY SMLCAP 100',
        'NIFTY SMLCAP 250',
        'NIFTY MIDSML 400',
        'NIFTY BANK',
        'NIFTY AUTO',
        'NIFTY FINSRV25 50',
        'NIFTY FIN SERVICE',
        'NIFTY FMCG',
        'NIFTY IT',
        'NIFTY MEDIA',
        'NIFTY METAL',
        'NIFTY INFRA',
        'NIFTY ENERGY',
        'INFTY PHARMA',
        'NIFTY PSU BANK',
        'NIFTY PVT BANK'
    ];

    return (
        <div>
            <div className="container text-center mt-4">
                <h1>Stock Market</h1>
                <select value={selectedIndex} onChange={handleIndexChange}>
                    {indexOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            {renderStockCards()}
            {renderStockDetails()}
        </div>
    );
};

export default Market;
