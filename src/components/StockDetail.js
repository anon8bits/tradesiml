import axios from "axios";

const StockDetail = (index, stock ) => {
    const data = localStorage.getItem(index);
    if(!data) {
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
        const response = axios.get(options);
        
    }
};

export default StockDetail;
