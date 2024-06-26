import { Router } from "express";
import OpenOrder from "../models/OpenOrders.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const email = req.query.email; 
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const orders = await OpenOrder.find({ userEmail: email }).sort({ orderStartTime: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
