import { Router } from "express";
import mongoose from "mongoose";
import OpenOrder from "../models/OpenOrders.js";

const router = Router();

const verifyOrderAndUser = async (orderId, email, model) => {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw new Error('Invalid order ID');
    }

    const order = await model.findById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }

    if (order.userEmail !== email) {
        throw new Error('Unauthorized access');
    }

    return order;
};

router.post('/:orderId/:email', async (req, res) => {
    try {
        const { orderId, email } = req.params;
        const order = await verifyOrderAndUser(orderId, email, OpenOrder);

        if (order.triggered) {
            return res.status(400).json({ message: 'Cannot cancel a triggered order' });
        }

        await OpenOrder.findByIdAndDelete(orderId);
        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;