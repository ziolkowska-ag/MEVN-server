const mongoose = require('mongoose');

const TripSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('trip', TripSchema);
