const express = require('express');

const server = express();

server.use('/', (req, res) => {
	res.send('<h2>Lets Party</h2>');
});

module.exports = server;
