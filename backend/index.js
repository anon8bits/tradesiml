import connectToMongo from './database.js';
import express, { json } from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors';

connectToMongo();

const app = express()
const port = 5000

app.use(json())
app.use(cors())
//Available routes
app.use('/api/auth', authRoutes)
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})