import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Market = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get(
                    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NSE:TCS&apikey=A0E9U5P956ZAKXD6`
                );

                const stockData = response.data['Global Quote'];
                setStocks(stockData);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchStocks();
    }, []);

    return (
        <div>
            <h2>Indian Stock Prices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Change</th>
                        <th>Change Percent</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks && (
                        <tr>
                            <td>{stocks['01. symbol']}</td>
                            <td>{stocks['05. price']}</td>
                            <td>{stocks['09. change']}</td>
                            <td>{stocks['10. change percent']}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Market;
