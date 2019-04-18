// External Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Internal Dependencies
const DefaultRoutes = require('./config/defaultRoutes')
const MongoConfig = require('./config/mongoConfig')
const _DefaultRoutes = require('./config/defaultRoutes')
const _Routes = require('./routes/index')

// Main app
const app = express();

// Express configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Main APIs
app.use(_DefaultRoutes.BASE_URL, _Routes)

// Start server
const server = app.listen(3000, () => {
    console.log(`[PORT:${server.address().port}] Server is running...`);
});
