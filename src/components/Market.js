import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import StockDetail from './StockDetail.js';
import { useStock } from './context/StockContext.js';

const Market = () => {
    const [stocks, setStocks] = useState([]);
    const { selectedIndex, selectedStock, setSelectedStock, setSelectedIndex } = useStock();
    const [currentPage, setCurrentPage] = useState(1);
    const stocksPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/stocks/${selectedIndex}`);
                setStocks(response.data);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch stock data. Please try again later.");
            }
        };

        fetchData();
    }, [selectedIndex]);

    const handleClick = (stock) => {
        setSelectedStock(stock);
        const stockSymbolWithoutSpaces = stock.symbol.replace(/\s/g, '');
        navigate(`/market/${selectedIndex}/${stockSymbolWithoutSpaces}`);
    };

    const handleIndexChange = (event) => {
        setSelectedIndex(event.target.value);
        setCurrentPage(1);
        console.log('Index: ', selectedIndex);
    };


    const renderStockCards = () => {
        const indexOfLastStock = currentPage * stocksPerPage;
        const indexOfFirstStock = indexOfLastStock - stocksPerPage;
        const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

        const totalPages = Math.ceil(stocks.length / stocksPerPage);

        let startPage = Math.max(1, currentPage - 5);
        let endPage = Math.min(totalPages, startPage + 9);

        if (endPage - startPage < 9) {
            startPage = Math.max(1, endPage - 9);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="container mt-4">
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
                <div className="pagination d-flex justify-content-center">
                    <button onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo(0, 0); }} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <div className="page-numbers-container">
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                onClick={() => { setCurrentPage(number); window.scrollTo(0, 0); }}
                                className={currentPage === number ? 'active' : ''}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo(0, 0); }} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
                <style>{`
        .pagination {
            text-align: center;
            margin-top: 20px; /* Adjust the margin as needed */
        }

        .pagination button {
            margin: 0 5px;
            padding: 5px 10px;
            border: 1px solid #ccc;
            cursor: pointer;
        }

        .page-numbers-container {
            display: flex;
            justify-content: center;
        }

        .pagination button.active {
            background-color: #4caf50;
            color: white;
        }

        .pagination button:disabled {
            color: #aaa;
            cursor: not-allowed;
        }
    `}</style>
            </div>
        );
    };

    const indexOptions = [
        'NIFTY-50',
        'NIFTY-NEXT-50',
        'NIFTY-MIDCAP-50',
        'NIFTY-SMLCAP-50',
        'NIFTY-BANK',
        'NIFTY-AUTO',
        'NIFTY-FINSRV25-50',
        'NIFTY-FIN-SERVICE',
        'NIFTY-FMCG',
        'NIFTY-IT',
        'NIFTY-MEDIA',
        'NIFTY-METAL',
        'NIFTY-INFRA',
        'NIFTY-ENERGY',
        'INFTY-PHARMA',
        'NIFTY-PSU-BANK',
        'NIFTY-PVT-BANK'
    ];
    return (
        <div>
            <div className="container text-center mt-4">
                <h3>Select Stock Index</h3>
                <select value={selectedIndex} onChange={handleIndexChange}>
                    {indexOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            {renderStockCards()}
            <Routes>
                <Route path="/market/*">
                    {selectedStock != null && <Route path=":indexName/:stockName" element={<StockDetail index={selectedIndex} stock={selectedStock} />} />}
                </Route>
            </Routes>

        </div>
    );
};

export default Market;
