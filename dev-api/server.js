const db = require('./db');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// generic routes
server.use(router);

server.listen(3000, () => {
    console.log('dev API is running')
});
