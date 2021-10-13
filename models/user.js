const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ['buyer'],
        default: 'buyer'
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;