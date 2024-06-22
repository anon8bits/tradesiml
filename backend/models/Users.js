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
    date: {
        type: Date,
        default: Date.now
    },
});

const User = model('User', userSchema);
User.createIndexes();

export default User;
