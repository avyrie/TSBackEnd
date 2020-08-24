const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    image:{
        type: String
    },
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;