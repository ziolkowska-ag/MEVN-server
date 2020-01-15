const express = require('express');
const mongoose = require("mongoose");
const multer = require('multer');

const trips = express.Router();
const Trip = require('../../models/Trip');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads/trips');
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

trips.get('/', (req, res) => {
    Trip.find().exec().then(docs => {
        res.status(200).json(docs)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});


trips.get('/:tripId', (req, res) => {
    const id = req.params.tripId;

    Trip.findById(id).exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Such a trip does not exist."
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


trips.post('/', upload.single('postImage'), (req, res) => {
    const trip = new Trip({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        country: req.body.country,
        price: req.body.price,
        date: Date.now(),
        postPhoto: req.file ? req.file.path : null
    });

    trip.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));

    res.status(200).json({
        message: "New trip added!",
        createdTrip: trip
    });
});

trips.delete('/:tripId', (req, res) => {
    const id = req.params.tripId;
    Trip.deleteOne({_id: id}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = trips;
