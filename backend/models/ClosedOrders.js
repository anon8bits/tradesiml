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
        required: true
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
        required: true
    },
    validity: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Active' // or 'Expired' if not executed within validity
    }
});

const OpenOrder = model('OpenOrder', openOrderSchema);

export default OpenOrder;
