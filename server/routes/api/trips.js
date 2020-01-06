const express = require('express');
const mongo = require('mongodb');
const mongoose = require("mongoose");

const trips = express.Router();
const Trip = require('../../models/Trip');

//  GET trips
trips.get('/', async (req, res) => {
    const trips = await loadTripsCollection();
    res.send(await trips.find({}).toArray());
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


// Add trip
trips.post('/', async (req, res) => {
    const trips = await loadTripsCollection();
    await trips.insertOne({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        country: req.body.country,
        price: req.body.price,
        date: new Date()
    });
    res.status(201).send();
});

// Delete trip
trips.delete('/:id', async (req, res) => {
    const trips = await loadTripsCollection();
    await trips.deleteOne({_id: new mongo.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadTripsCollection() {
    const client = await mongo.MongoClient.connect
    ('mongodb+srv://abc123:adminAbc123@sklep-luflk.mongodb.net/test?retryWrites=true&w=majority',  {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('Sklep').collection('trips');
}

module.exports = trips;
