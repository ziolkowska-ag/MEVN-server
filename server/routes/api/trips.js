const express = require('express');
const mongoose = require("mongoose");

const trips = express.Router();
const Trip = require('../../models/Trip');

trips.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    Trip.find().exec().then(docs => {
        const usersTrips = [];
        docs.forEach(function (t) {
            if (t.created_by == userId) {
                usersTrips.push(t);
            }
        });
        res.status(200).json(usersTrips)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});


trips.get('/:userId/:tripId', (req, res) => {
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


trips.post('/', (req, res) => {
    const trip = new Trip({
        _id: new mongoose.Types.ObjectId(),
        created_by: req.body.created_by,
        name: req.body.name,
        country: req.body.country,
        price: req.body.price,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
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

trips.patch("/:userId/:tripId", (req, res) => {
    const id = req.params.tripId;
    Trip.updateOne({_id: id}, {
        $set: {
            created_by: req.body.created_by,
            name: req.body.name,
            country: req.body.country,
            price: req.body.price,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        }
    }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});
module.exports = trips;
