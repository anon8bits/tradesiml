import { Router } from "express";
import Stock from "../models/Stocks.js";

const router = Router();

router.get('/:stock', async (req, res) => {
    const {stock} = req.params;
    try {
        const data = await Stock.findOne({symbol: stock});
        res.json(data);
    } catch (error) {
        console.log('Error getting data for stock: ', stock);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;