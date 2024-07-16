import { Router } from "express";
import User from "../models/Users.js";
import { checkJwt, extractEmail } from '../middlewares/auth0Middleware.js'

const router = Router();

router.post('/', checkJwt, extractEmail, async (req, res) => {
    const email = req.email;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.balance += 100000;
        await user.save();
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
