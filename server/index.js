const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const App = express();

// middleware
App.use(bodyParser.json());
App.use(cors());

const posts = require('./routes/api/posts')
const trips = require('./routes/api/trips');
App.use('/api/trips', trips);
App.use('/api/posts', posts);

const port = process.env.PORT || 5000;

App.listen(port, () => console.log(`Server started on port ${port}`));
