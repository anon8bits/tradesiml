// databaseLogic.js

import axios from 'axios';
import Stock from '../models/Stocks.js';

const indices = [
    'NIFTY 50',
    'NIFTY NEXT 50',
    'NIFTY MIDCAP 50',
    'NIFTY SMLCAP 50',
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

const fetchAndUpdateStockData = async (index) => {
    try {
        const response = await axios.get('https://latest-stock-price.p.rapidapi.com/price', {
            params: {
                Indices: index
            },
            headers: {
                'X-RapidAPI-Key': '76849e1e22msh237b2a51eb428a7p141245jsn3fa09fb60d0d',
                'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
            }
        });

        const stocksData = response.data;

        for (const stock of stocksData) {

            /* if (typeof stock.perChange365d === 'string') {
                stock.perChange365d = parseFloat(stock.perChange365d);
            } */

            for (const key in stock) {
                if (typeof stock[key] === 'string' && !isNaN(stock[key])) {
                    const parsedValue = parseFloat(stock[key]);
                    if (!isNaN(parsedValue)) {
                        stock[key] = parsedValue;
                    }
                }
            }            

            const formattedIndex = index.replace(/\s+/g, '-');

            const existingStock = await Stock.findOne({ symbol: stock.symbol });
            let stockToUpdate = existingStock;

            if (!existingStock) {
                stockToUpdate = new Stock({
                    ...stock,
                    index: formattedIndex,
                    lastUpdateTime: new Date(stock.lastUpdateTime)
                });

            } else {
                if (!existingStock.indices.includes(formattedIndex)) {
                    existingStock.indices.push(formattedIndex);
                    await existingStock.save();
                }
            }
            await stockToUpdate.save();
        }

    } catch (error) {
      //  console.error(`Error updating stock data for ${index}:`, error);
    } finally {
        await delay(5000);
    }
};

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const fetchAndUpdateAllStockData = async () => {
    for (const index of indices) {
        await fetchAndUpdateStockData(index);
    }
};

fetchAndUpdateAllStockData();
setInterval(fetchAndUpdateAllStockData, 10 * 60 * 1000);

export default fetchAndUpdateAllStockData;
