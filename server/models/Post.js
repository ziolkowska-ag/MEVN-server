const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('post', PostSchema);
