const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    image:{
        type: String
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please enter your name. This will be displayed on your profile'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 4,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    hikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hike"
        }
    ]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;