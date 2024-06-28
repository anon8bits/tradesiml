import { Router } from "express";
import validateOrder from '../middlewares/validateOrder.js';
import OpenOrder from "../models/OpenOrders.js";

const router = Router();

router.post('/', validateOrder, async (req, res) => {
    try {
        const {
            email,
            entryPrice,
            orderQuantity,
            orderType,
            stopLoss,
            symbol,
            targetPrice,
            timeFrame
        } = req.body;

        const currentStockPrice = req.stock.LTP;
        let triggered = false;
        if (orderType === 'Buy') {
            triggered = currentStockPrice <= entryPrice;
        } else if (orderType === 'Sell') {
            triggered = currentStockPrice >= entryPrice;
        }

        const validity = Date.now() + 24 * 60 * 60 * 1000 * timeFrame;

        const newOrder = new OpenOrder({
            userEmail: email,
            stockName: symbol,
            entryPrice,
            orderQuantity,
            targetPrice,
            stopLoss,
            type: orderType,
            triggered,
            PL: triggered ? 0 : null,
            validity: validity
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error); 
        res.status(500).json('Internal server error');
    }
});

export default router
