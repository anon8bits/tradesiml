import connectDB from './database.js';
import express, { json } from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import fetchAndUpdateAllStockData from './routes/FetchStocks.js';
import stockRoute from './routes/GetStocks.js'
import StockDetailRoute from './routes/GetStockDetails.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config({ path: '../.env' });
connectDB();

const app = express();
const port = process.env.BACK_PORT;


app.use(json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ADD,
  credentials: true,
  optionsSuccessStatus: 200,
}));
 app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoute);
app.use('/api/stockDetail', StockDetailRoute)

fetchAndUpdateAllStockData();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
