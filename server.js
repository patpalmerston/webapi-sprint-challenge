const express = require('express');
const configureMiddleware = require('./data/middleware/middleware')


const server = express();
configureMiddleware(server)

server.use('/', (req, res) => {
	res.send('<h2>Lets Party</h2>');
});

module.exports = server;
