const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

/**
 * We create the app variable and initialize it to be an Express Application
 */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point to static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/api', require('./server/routes'))

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// CREATE HTTP SERVER
const server = http.createServer(app);

// LISTEN ON PORT
server.listen(port, () => console.log(`API RUNNING ON LOCALHOST: ${port}`));