import connectToMongo from './database.js';
import express, { json } from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import fetchAndUpdateAllStockData from './routes/FetchStocks.js';
import stockRoute from './routes/GetStocks.js'

connectToMongo();

const app = express();
const port = 5000;

app.use(json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoute);

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}));

fetchAndUpdateAllStockData();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
