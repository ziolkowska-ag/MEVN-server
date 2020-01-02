const mongoose = require('mongoose');

const TripSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    price: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    tripPhoto: {
        type: String
    }
});

module.exports = mongoose.model('trip', TripSchema);
