import { Router } from "express";
import { Types } from "mongoose";
import OpenOrder from "../models/OpenOrders.js";
import Stocks from "../models/Stocks.js";
import ClosedOrder from "../models/ClosedOrders.js";

const router = Router();

router.post('/:orderId/:email', async (req, res) => {
    const { orderId, email } = req.params;

    if (!Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ error: "Invalid order ID" });
    }

    try {
        const order = await OpenOrder.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (order.userEmail !== email) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        if (!order.triggered) {
            return res.status(400).json({ error: "Order not triggered" });
        }

        const stock = await Stocks.findOne({ Symbol: order.stockName });
        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }

        let pl;
        if (order.type=== 'Buy') {
            pl = stock.LTP - order.entryPrice;
        } else if (order.type === 'Sell') {
            pl = order.entryPrice - stock.LTP;
        } else {
            return res.status(400).json({ error: "Invalid order type" });
        }

        const closedOrder = new ClosedOrder({
            userEmail: order.userEmail,
            stockName: order.stockName,
            entryPrice: order.entryPrice,
            tradePrice: stock.LTP,
            orderQuantity: order.orderQuantity,
            targetPrice: order.targetPrice,
            stopLoss: order.stopLoss,
            status: "Early execution by user",
            PL: pl * order.orderQuantity,
            OrderStartTime: order.orderStartTime,
            OrderCloseTime: new Date()
        });

        await closedOrder.save();
        await OpenOrder.findByIdAndDelete(orderId);

        res.status(200).json({ message: "Order executed successfully", closedOrder });
    } catch (error) {
        console.error("Error executing order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;