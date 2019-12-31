const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

const App = express();

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: false}));
App.use(cors());

const mongoURL = 'mongodb+srv://abc123:adminAbc123@sklep-luflk.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoURL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const Posts = require('./routes/api/posts');
const Trips = require('./routes/api/trips');
const Users = require('./routes/api/users');

App.use('/api/trips', Trips);
App.use('/api/posts', Posts);
App.use('/api/users', Users);
App.use('/uploads', express.static('uploads'));

App.listen(port, () => console.log(`Server started on port ${port}`));
