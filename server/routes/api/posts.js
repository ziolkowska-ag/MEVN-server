const express = require('express');
const posts = express.Router();
const mongoose = require("mongoose");

const Post = require('../../models/Post');

posts.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    Post.find().exec().then(docs => {
        const usersPosts = [];
        docs.forEach(function(p) {
            if(p.created_by == userId) {
                usersPosts.push(p);
            }
        });
        res.status(200).json(usersPosts)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

posts.get('/:userId/:postId', (req, res) => {
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

posts.post('/', (req, res) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        created_by: req.body.created_by,
        title: req.body.title,
        text: req.body.text,
        date: Date.now(),
    });

    post.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(200).json({
        message: "New post added!",
        createdPost: post
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

posts.patch("/:userId/:postId", (req, res) => {
    const id = req.params.postId;
    Post.updateOne({_id: id}, {
        $set: {
            created_by: req.body.created_by,
            title: req.body.title,
            text: req.body.text,
            date: new Date(),
        }
    }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});
module.exports = posts;
