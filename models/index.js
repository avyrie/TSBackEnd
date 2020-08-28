const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trailstamp';

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
} || 'mongodb://localhost:27017/trailstamp')
    .then(() => console.log(`MongoDB connected successfully.`))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
    Hike: require('./Hike'),
    User: require('./User'),
};