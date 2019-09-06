const server = require('./server');

const port = 8888;

server.listen(port, () => console.log(`\n*** API on Port ${port}***\n`));
