const http = require('http');

const routes = require('./routes');

const serverPort = 3000;
const server = http.createServer(routes.handler);

server.listen(serverPort);
