import { Router } from "express";
import validateOrder from '../middlewares/validateOrder.js'
import OpenOrder from "../models/OpenOrders.js";
import User from "../models/Users.js";
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
            targetPrice
        } = req.body;

        const currentStockPrice = req.stock.LTP;
        let triggered = false;
        if (orderType === 'Buy') {
            triggered = currentStockPrice <= entryPrice;
        } else if (orderType === 'Sell') {
            triggered = currentStockPrice >= entryPrice;
        }

            
        const newOrder = new OpenOrder({
            userEmail: email,
            stockName: symbol,
            entryPrice,
            orderQuantity,
            targetPrice,
            stopLoss,
            type: orderType,
            triggered,
            PL: triggered ? 0 : null
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json('Internal server error');
    }

});

export default router;