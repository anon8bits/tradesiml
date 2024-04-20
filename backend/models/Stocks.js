import { Schema, model } from 'mongoose';

const stockSchema = new Schema({
  symbol: String,
  identifier: String,
  open: Number,
  dayHigh: Number,
  dayLow: Number,
  lastPrice: Number,
  previousClose: Number,
  change: Number,
  pChange: Number,
  yearHigh: Number,
  yearLow: Number,
  totalTradedVolume: Number,
  totalTradedValue: Number,
  lastUpdateTime: String,
  perChange365d: Number,
  perChange30d: Number
});

export default model('Stock', stockSchema);
