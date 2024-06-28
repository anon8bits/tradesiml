import { Router } from "express";
import ClosedOrder from "../models/ClosedOrders.js";

const router = Router();

router.get('/:orderID/:email', async (req, res) => {
    const { orderID, email } = req.params;

    try {
        const order = await ClosedOrder.findById(orderID);
        if (!order) {
            return res.status(404).send('Order not found');
        }

        if (order.userEmail === email) {
            return res.json(order);
        } else {
            return res.status(403).send('Forbidden');
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
});

export default router;