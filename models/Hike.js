const mongoose = require('mongoose');

const hikeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    difficulty: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
});

const Hike = mongoose.model('Hike', hikeSchema);

module.exports = Hike;