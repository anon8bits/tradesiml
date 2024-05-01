import connectToMongo from './database.js';
import express, { json } from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import fetchAndUpdateAllStockData from './routes/FetchStocks.js';
import stockRoute from './routes/GetStocks.js'
import StockDetailRoute from './routes/GetStockDetails.js';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});
connectToMongo();

const app = express();
const port = process.env.BACK_PORT;

app.use(json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoute);
app.use('/api/stockDetail', StockDetailRoute);

app.use(cors({
  origin: `${process.env.CORS_ADD}`,
  optionsSuccessStatus: 200,
}));

//fetchAndUpdateAllStockData();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
