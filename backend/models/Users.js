import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // Reference to Portfolio schema
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: 'Portfolio',
    },
});

const User = model('User', userSchema);
User.createIndexes();

export default User;
