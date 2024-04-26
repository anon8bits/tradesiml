import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const stockSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    indices: [{ type: String }],
    identifier: {
        type: String,
    },
    open: {
        type: Number,
        required: true
    },
    dayHigh: {
        type: Number,
    },
    dayLow: {
        type: Number,
    },
    lastPrice: {
        type: Number,
    },
    previousClose: {
        type: Number,
    },
    change: {
        type: Number,
    },
    pChange: {
        type: Number,
    },
    yearHigh: {
        type: Number,
    },
    yearLow: {
        type: Number,
    },
    totalTradedVolume: {
        type: Number,
    },
    totalTradedValue: {
        type: Number,
    },
    lastUpdateTime: {
        type: Date,
    },
    perChange365d: {
        type: Number,
    },
    perChange30d: {
        type: Number,
    }
});


const Stock = model('Stock', stockSchema);
Stock.createIndexes();

export default Stock;
