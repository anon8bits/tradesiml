import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Market = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState('NIFTY-50');
    const [selectedStock, setSelectedStock] = useState('NIFTY-50');
    const [currentPage, setCurrentPage] = useState(1);
    const stocksPerPage = 20;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/stocks/${selectedIndex}`);
                setStocks(response.data);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch stock data. Please try again later.");
            }
        };

        fetchData();
    }, [selectedIndex]);

    const handleClick = (stock) => {
        setSelectedStock(stock.symbol);
        navigate(`/market/${stock.symbol}`);
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
            <div className="container mt-4" style={{ backgroundColor: 'white' }}>
                <div className="row">
                    {currentStocks.map((stock) => (
                        <div key={stock.symbol} className="col-md-4 mb-4">
                            <div className="card" onClick={() => handleClick(stock)} style={{ border: '2px solid green', borderRadius: '10px', backgroundColor: 'white' }}>
                                <div className="card-body" style={{ fontWeight: 'bold', textAlign: 'center', color: 'black', padding: '0.75rem' }}>
                                    <div style={{ backgroundColor: '#19F5AA', color: 'white', borderRadius: '10px 10px 0 0', padding: '0.5rem 0', marginBottom: '0.5rem' }}>{stock.symbol}</div>
                                    <p className="card-text" style={{ fontWeight: 'bold', color: 'black' }}>Last Price: ₹{stock.lastPrice}</p>
                                    <p className="card-text" style={{ fontWeight: 'bold', color: 'black' }}>
                                        Change: <span style={{ color: stock.change < 0 ? 'red' : 'green' }}>
                                            {stock.change < 0 ? `- ₹ ${Math.abs(stock.change).toFixed(2)}` : `₹ ${stock.change.toFixed(2)}`}
                                        </span>
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination d-flex justify-content-center" style={{ marginBottom: '20px' }}>
                    <button onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo(0, 0); }} disabled={currentPage === 1} style={{ marginRight: '5px', backgroundColor: '#f0f0f0', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
                        Previous
                    </button>
                    <div className="page-numbers-container">
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                onClick={() => { setCurrentPage(number); window.scrollTo(0, 0); }}
                                className={currentPage === number ? 'active' : ''}
                                style={{ fontWeight: 'bold', backgroundColor: currentPage === number ? '#19F5AA' : '#f0f0f0', color: currentPage === number ? 'white' : 'black', border: 'none', padding: '5px 10px', borderRadius: '5px', margin: '0 2px' }}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo(0, 0); }} disabled={currentPage === totalPages} style={{ marginLeft: '5px', backgroundColor: '#f0f0f0', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
                        Next
                    </button>
                </div>


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
        <div style={{ backgroundColor: 'white' }}>
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
        </div>
    );
};

export default Market;
