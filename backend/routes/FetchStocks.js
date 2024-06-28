import axios from 'axios';
import Stock from '../models/Stocks.js';
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });

const indicies = [
    'NIFTY', 'BANKNIFTY', 'NIFTYOIL', 'NIFTYPVTBANK', 'NIFTYM50', 'NSEQ30'
];

const fetchAndUpdateStockData = async (index) => {
    try {
        const response = await axios.get(`${process.env.RAPID_API_URL}`, {
            params: {
                Indicies: index
            },
            headers: {
                'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
                'x-rapidapi-host': `${process.env.RAPID_API_HOST}`
            }
        });
        const stocksData = response.data;
        // console.log('Stocks data: ', stocksData);

        for (const stock of stocksData) {
            if (!stock.ISIN || typeof stock.ISIN !== 'string') continue;
            const filter = { ISIN: stock.ISIN };
            const update = {
                Symbol: stock.Symbol,
                DateTime: new Date(stock['Date/Time']),
                TotalVolume: stock['Total Volume'],
                NetChange: stock['Net Change'],
                LTP: stock.LTP,
                Volume: stock.Volume,
                High: stock.High,
                Low: stock.Low,
                Open: stock.Open,
                PClose: stock['P Close'],
                Name: stock.Name,
                Week52High: stock['52Wk High'],
                Week52Low: stock['52Wk Low'],
                Year5High: stock['5Year High'],
                ISIN: stock.ISIN,
                Month1High: stock['1M High'],
                Month3High: stock['3M High'],
                Month6High: stock['6M High'],
                PercentChange: stock['%Chng'],
                $addToSet: { Index: index }
            };

            await Stock.findOneAndUpdate(filter, update, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
                runValidators: true
            });
        }

    } catch (error) {
        console.error(`Error updating stock data for ${index}:`, error);
    }
};

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const fetchAndUpdateAllStockData = async () => {
    const now = new Date();
    const startTime = new Date();
    startTime.setHours(9, 15, 0); // 9:15 AM IST
    const endTime = new Date();
    endTime.setHours(15, 45, 0); // 3:45 PM IST
    if (now >= startTime && now <= endTime) {
        for (const index of indicies) {
            await fetchAndUpdateStockData(index);
            await delay(1000);
        }
    }
    // for (const index of indicies) {
    //     await fetchAndUpdateStockData(index);
    //     await delay(1000);
    // }
};

fetchAndUpdateAllStockData();
setInterval(fetchAndUpdateAllStockData, 5 * 60 * 1000);

export default fetchAndUpdateAllStockData;
