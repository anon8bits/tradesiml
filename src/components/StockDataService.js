// StockDataService.js

import axios from 'axios';

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

const fetchAndUpdateAllIndices = async () => {
    for (const selectedIndex of indexOptions) {
        let retryCount = 3; // Set the number of retries

        while (retryCount > 0) {
            const cachedData = localStorage.getItem(selectedIndex);

            if (!cachedData) {
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
                    const responseData = response.data;

                    // Retry fetching if the response is empty
                    if (Object.keys(responseData).length === 0) {
                        throw new Error('Empty response from the API');
                    }

                    // Store data in local storage
                    localStorage.setItem(selectedIndex, JSON.stringify(responseData));
                    break; // Break out of the retry loop if successful
                } catch (error) {
                    console.error(`Error fetching data for ${selectedIndex}:`, error);
                    retryCount--;
                }
            } else {
                break; // Break out of the loop if data is already cached
            }
        }
    }
};

const fetchData = async (selectedIndex) => {
    const cachedData = localStorage.getItem(selectedIndex);
    return cachedData ? JSON.parse(cachedData) : null;
};

export { fetchAndUpdateAllIndices, fetchData };
