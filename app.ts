const http = require('http');

const serverPort = 3000;

const server = http.createServer((req: unknown, res: unknown) => {
  console.log({ req });
  process.exit();
});

server.listen(serverPort);
