import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const openOrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stockName: {
        type: String,
        required: true
    },
    entryPrice: {
        type: Number,
        required: false
    },
    tradePrice: {
        type: Number,
        required: true
    },
    orderQuantity: {
        type: Number,
        required: true
    },
    targetPrice: {
        type: Number,
        required: true
    },
    stopLoss: {
        type: Number,
        required: false
    },
    validity: {
        type: Date,
        required: true,
        default: () => Date.now() + 24 * 60 * 60 * 1000
    },
    status: {
        type: String,
        default: 'Active'
    }
});

const OpenOrder = model('OpenOrder', openOrderSchema);

export default OpenOrder;
