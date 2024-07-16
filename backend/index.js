import connectDB from './database.js';
import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import allowedOrigins from './corsConfig.js';
import fs from 'fs';
import https from 'https';
import routes from './routes/routes.js';
import cron from 'node-cron'
import moment from 'moment-timezone';
import startStockDataCron from './routes/FetchStocks.js';
import updateOpenOrders from './orderUpdate.js';

dotenv.config({ path: '../.env' });
connectDB();

const app = express();
const port = process.env.BACK_PORT;

app.use(json());

const options = {
  key: fs.readFileSync('C:/Users/Anonymous/.vscode/React/tradesiml/backend/SSL Certificate/server.key'),
  cert: fs.readFileSync('C:/Users/Anonymous/.vscode/React/tradesiml/backend/SSL Certificate/server.cert')
};

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Dynamically use all routes
Object.entries(routes).forEach(([path, router]) => {
  app.use(path, router);
});

startStockDataCron();

const isMarketOpen = () => {
  const now = moment().tz('Asia/Kolkata');
  const dayOfWeek = now.day();
  const hour = now.hour();
  const minute = now.minute();

  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    const currentTimeInMinutes = hour * 60 + minute;
    const marketOpenTime = 9 * 60 + 15;
    const marketCloseTime = 15 * 60 + 30;
    return currentTimeInMinutes >= marketOpenTime && currentTimeInMinutes < marketCloseTime;
  }

  return false;
};
cron.schedule('*/5 * * * *', async () => {
  if (isMarketOpen()) {
    try {
      await updateOpenOrders();
    } catch (error) {
      console.error('Error updating open orders:', error);
    }
  }
});

https.createServer(options, app).listen(port, '0.0.0.0', () => {
  console.log(`App listening on https://localhost:${port}`);
});