import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: {
        type: String,
        min: 4,
        max: 16,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    balance: {
        type: Number
    },
    requests: {
        type: Array
    },
    history: {
        type: Array
    }
});

export const userModel = mongoose.model('User', schema);