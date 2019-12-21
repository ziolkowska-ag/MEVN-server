const express = require('express');
const mongo = require('mongodb');

const router = express.Router();

//  GET trips
router.get('/', async (req, res) => {
    const trips = await loadTripsCollection();
    res.send(await trips.find({}).toArray());
});


// Add trip
router.post('/', async (req, res) => {
    const trips = await loadTripsCollection();
    await trips.insertOne({
        name: req.body.name,
        country: req.body.country,
        price: req.body.price,
        date: new Date()
    });
    res.status(201).send();
});

// Delete trip
router.delete('/:id', async (req, res) => {
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

module.exports = router;
