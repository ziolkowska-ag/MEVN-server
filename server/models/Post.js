const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
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
        required: false
    }
});

module.exports = mongoose.model('post', PostSchema);
