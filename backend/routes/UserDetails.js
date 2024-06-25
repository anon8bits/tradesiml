import { Router } from "express";
import User from "../models/Users.js";
const router = Router();

router.get('/', async (req, res) => {
    try {
        const email = req.query.email;
        const data = await User.findOne({email : email});
        if(!data) {
            res.status(404).json("User not found!")
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json('Internal Server Error!')
    }
});

export default router;