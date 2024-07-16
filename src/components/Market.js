import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert.js';
import styles from './css/Search.module.css';

const Market = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState('NIFTY');
    const [currentPage, setCurrentPage] = useState(1);
    const [alertInfo, setAlertInfo] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const stocksPerPage = 21;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/stocks/${selectedIndex}`, {
                    withCredentials: true, 
                });
                setStocks(response.data);
                setSearchTerm('');
            } catch (error) {
                console.log(error);
                setAlertInfo({ title: 'Server Error!' });
            }
        };

        fetchData();
    }, [selectedIndex]);

    const handleClick = (stock) => {
        navigate(`/market/${stock.Symbol}`);
    };

    const handleIndexChange = (event) => {
        setSelectedIndex(event.target.value);
        setCurrentPage(1);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const renderStockCards = () => {
        const filteredStocks = stocks.filter(stock =>
            stock.Symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const indexOfLastStock = currentPage * stocksPerPage;
        const indexOfFirstStock = indexOfLastStock - stocksPerPage;
        const currentStocks = filteredStocks.slice(indexOfFirstStock, indexOfLastStock);

        const totalPages = Math.ceil(filteredStocks.length / stocksPerPage);

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
                {filteredStocks.length === 0 ? (
                    <p>No results found</p>
                ) : (
                    <div className="row">
                        {currentStocks.map((stock) => (
                            <div key={stock.Symbol} className="col-md-4 mb-4">
                                <div className="card" onClick={() => handleClick(stock)} style={{ border: '2px solid green', borderRadius: '10px', backgroundColor: 'white' }}>
                                    <div className="card-body" style={{ fontWeight: 'bold', textAlign: 'center', color: 'black', padding: '0.75rem' }}>
                                        <div style={{ backgroundColor: '#19F5AA', color: 'white', borderRadius: '10px 10px 0 0', padding: '0.5rem 0', marginBottom: '0.5rem' }}>{stock.Symbol}</div>
                                        <p className="card-text" style={{ fontWeight: 'bold', color: 'black' }}>Last Price: ₹{stock.LTP}</p>
                                        <p className="card-text" style={{ fontWeight: 'bold', color: 'black' }}>
                                            Change: <span style={{ color: stock.NetChange < 0 ? 'red' : 'green' }}>
                                                {stock.NetChange < 0 ? `- ₹ ${Math.abs(stock.NetChange)}` : `₹ ${stock.NetChange}`}
                                            </span>
                                        </p>
                                        <p className="card-text" style={{ fontWeight: 'bold', color: 'black' }}>
                                            Percent Change: <span style={{ color: stock.PercentChange < 0 ? 'red' : 'green' }}>
                                                {`${stock.PercentChange} %`}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="pagination d-flex justify-content-center" style={{ marginBottom: '20px' }}>
                    <button
                        key="prev"
                        onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo(0, 0); }}
                        disabled={currentPage === 1}
                        style={{ marginRight: '5px', backgroundColor: '#f0f0f0', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                    >
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
                    <button
                        key="next"
                        onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo(0, 0); }}
                        disabled={currentPage === totalPages}
                        style={{ marginLeft: '5px', backgroundColor: '#f0f0f0', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const indexOptions = [
        'NIFTY', 'BANKNIFTY', 'NIFTYOIL', 'NIFTYPVTBANK', 'NIFTYM50', 'NSEQ30'
    ];

    return (
        <>
            {alertInfo && (
                <CustomAlert
                    title={alertInfo.title}
                    onClose={() => setAlertInfo(null)}
                />
            )}
            <div style={{ backgroundColor: 'white' }}>
                <div className="container text-center mt-4">
                    <h3 style={{ color: 'black' }}><strong>Select Stock Index</strong></h3>
                    <select value={selectedIndex} onChange={handleIndexChange}>
                        {indexOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                        <input
                            className={styles.input}
                            type="text"
                            name="text"
                            placeholder="Search stocks..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                {renderStockCards()}
            </div>
        </>
    );
};

export default Market;
