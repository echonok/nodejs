const fs = require('fs');

const requestHandler = (req, res) => {
  console.log({ url: req.url, method: req.method, headers: req.headers });
  const url = req.url;

  switch (url) {
    case '/':
      res.write('<html>');
      res.write('<head><title>Enter message</title></head>');
      res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
      res.write('</html>');
      return res.end();
    case '/message':
      if (req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
          console.log({ chunk });
          body.push(chunk);
        });
        return req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          console.log({ parsedBody });
          const message = parsedBody.split('=')[1];
          fs.writeFile('message.txt', message, (err) => {
            if (err) {
              console.error({ err });
              res.statusCode = 500;
              res.setHeader('Location', '/error');
              return res.end();
            }
            console.log('finish')
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
          });
        });
      }
    default:
      res.write('<html>');
      res.write('<head><title>My first page</title></head>');
      res.write('<body><h1>Other page</h1></body>');
      res.write('</html>');
      return res.end();
      break;
  }
}

module.exports = {
  handler: requestHandler,
  someText: 'Some hardcoded text',
};
