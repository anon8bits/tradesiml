import connectDB from './database.js';
import express, { json } from 'express';
import authRoutes from './routes/auth.js';
import orderRoute from './routes/ExecuteOrder.js'
import cors from 'cors';
import fetchAndUpdateAllStockData from './routes/FetchStocks.js';
import userDetails from './routes/UserDetails.js'
import stockRoute from './routes/GetStocks.js'
import StockDetailRoute from './routes/GetStockDetails.js';
import FetchOpenOrders from './routes/FetchOpenOrders.js'
import FetchClosedOrders from './routes/FetchClosedOrders.js'
import OpenOrderDetails from './routes/openOrderDetails.js'
import ClosedOrderDetails from './routes/closedOrderDetails.js';
import CancelOrder from './routes/cancelOrder.js'
import ExecuteNow from './routes/ExecuteNow.js'
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
app.use('/api/order', orderRoute);
app.use('/api/stocks', stockRoute);
app.use('/api/stockDetail', StockDetailRoute);
app.use('/api/fetchOpenOrders', FetchOpenOrders);
app.use('/api/fetchClosedOrders', FetchClosedOrders);
app.use('/api/getUser', userDetails);
app.use('/api/open', OpenOrderDetails);
app.use('/api/closed', ClosedOrderDetails);
app.use('/api/cancelOrder', CancelOrder);
app.use('/api/executenow', ExecuteNow);
fetchAndUpdateAllStockData();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
