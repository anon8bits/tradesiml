import { Router } from "express";
import ClosedOrder from "../models/ClosedOrders.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const email = req.query.email; 
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const orders = await ClosedOrder.find({ userEmail: email }).sort({ OrderCloseTime: -1 });

        // if (orders.length === 0) {
        //     return res.status(404).json({ message: "No orders found for this user" });
        // }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error});
    }
});

export default router;
