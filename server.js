const express = require('express');
const configureMiddleware = require('./data/middleware/middleware')
const projectsRouter = require('./data/routers/projectsRouter')
const actionsRouter = require('./data/routers/actionsRouter')


const server = express();
configureMiddleware(server)

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.use('/', (req, res) => {
	res.send('<h2>Lets Party</h2>');
});

module.exports = server;
