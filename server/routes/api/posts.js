const express = require('express');
const posts = express.Router();
const multer = require('multer');
const Post = require('../../models/Post');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(":", "_").replace(":", "_") + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

posts.post('/', upload.single('postImage'), (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        date: Date.now(),
        postPhoto: req.file.path
        // todo: make it work without postPhoto
    });

    post.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(200).json({
        message: "New post added!",
        createdPost: post
    });
});

posts.get('/', (req, res) => {
    Post.find().exec().then(docs => {
        res.status(200).json(docs)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

posts.get('/:postId', (req, res) => {
    const id = req.params.postId;

    Post.findById(id).exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Such a post does not exist."
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

posts.delete("/:postId", (req, res) => {
    const id = req.params.postId;
    Post.deleteOne({_id: id}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = posts;
