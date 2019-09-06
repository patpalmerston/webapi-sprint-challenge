const express = require('express');
const configureMiddleware = require('./data/middleware/middleware')
const projectsRouter = require('./data/routers/projectsRouter')


const server = express();
configureMiddleware(server)

server.use('/api/projects', projectsRouter)

server.use('/', (req, res) => {
	res.send('<h2>Lets Party</h2>');
});

module.exports = server;
