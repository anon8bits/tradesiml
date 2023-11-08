import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const transactionSchema = new Schema({
    stockSymbol: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String, // 'buy' or 'sell'
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    profitLoss: {
        type: Number,
    },
    duration: {
        type: String, // You can use a Date type to store the duration if needed
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const portfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
    },
    transactions: [transactionSchema],
});

const Portfolio = model('Portfolio', portfolioSchema);

export default Portfolio;
