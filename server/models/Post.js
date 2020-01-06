const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
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
    postPhoto: {
        type: String,
    }
});

module.exports = mongoose.model('post', PostSchema);
